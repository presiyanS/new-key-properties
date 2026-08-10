import { NextRequest, NextResponse } from 'next/server'
import {
  sanity,
  anthropic,
  resend,
  ALLOWED_DOMAINS,
  pickTopic,
  formatDate,
  buildResearchSystemPrompt,
  buildResearchNotes,
  buildFailureEmailHtml,
  extractJson,
  extractText,
  type ResearchResult,
} from './shared'

export const maxDuration = 300

// Split from the writing step (see ./write/route.ts) because the combined
// research+writing job started timing out once the writing pass began
// producing both Bulgarian and English content — research alone stays well
// under the limit. This route only verifies facts and saves them; the write
// route (a separate cron, ~15 min later) turns them into the actual draft.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const notifyEmail = process.env.PERSONAL_NOTIFY_EMAIL

  try {
    const now = new Date()
    const topic = pickTopic(now)
    const todayISO = formatDate(now)

    // Research pass — web-search-grounded, restricted to the approved sources.
    const researchResponse = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 8192,
      output_config: { effort: 'medium' },
      system: buildResearchSystemPrompt(todayISO),
      tools: [
        {
          type: 'web_search_20260209',
          name: 'web_search',
          max_uses: 10,
          allowed_domains: ALLOWED_DOMAINS,
        },
      ],
      messages: [{ role: 'user', content: topic.research }],
    })

    if (researchResponse.stop_reason === 'refusal') {
      throw new Error('Research request was declined by safety classifiers')
    }

    const research = extractJson<ResearchResult>(extractText(researchResponse.content))

    if (!research || research.facts.length < 2) {
      const reason =
        'Тази седмица AI изследването не успя да потвърди достатъчно факти от одобрените източници (нужни са поне 2 съвпадащи източника за всеки факт), затова не беше генерирана статия — за да няма грешни данни на сайта. Ще опитаме отново следващата седмица.'
      if (notifyEmail) {
        await resend.emails.send({
          from: 'New Key Properties <noreply@newkey.bg>',
          to: notifyEmail,
          subject: 'Блог: няма нова статия тази седмица',
          html: buildFailureEmailHtml(reason),
        })
      }
      return NextResponse.json({ success: false, reason: 'insufficient_verified_facts' })
    }

    // Save the verified facts for the write step to pick up — not a public
    // content type, just a handoff document between the two cron jobs.
    const pending = await sanity.create({
      _type: 'blogPostResearch',
      createdAt: now.toISOString(),
      topicSlugPrefix: topic.slug_prefix,
      topicCategory: topic.category,
      topicAngle: topic.angle,
      topicImage: topic.image,
      researchNotes: buildResearchNotes(research),
      factsJson: JSON.stringify(research.facts),
    })

    return NextResponse.json({ success: true, stage: 'research', id: pending._id, verifiedFacts: research.facts.length })
  } catch (error) {
    console.error('Cron market post research error:', error)
    if (notifyEmail) {
      try {
        await resend.emails.send({
          from: 'New Key Properties <noreply@newkey.bg>',
          to: notifyEmail,
          subject: 'Блог: грешка при генериране на статия',
          html: buildFailureEmailHtml(`Възникна техническа грешка тази седмица: ${String(error)}. Няма да пропуснем данни — просто провери следващата седмица или се свържи с Claude.`),
        })
      } catch (emailError) {
        console.error('Failed to send failure notification:', emailError)
      }
    }
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
