import { NextRequest, NextResponse } from 'next/server'
import {
  sanity,
  anthropic,
  resend,
  formatDate,
  buildWritingSystemPrompt,
  buildFailureEmailHtml,
  buildDraftReadyEmailHtml,
  extractJson,
  extractText,
  type ResearchFact,
} from '../shared'

export const maxDuration = 300

type PendingResearch = {
  _id: string
  topicSlugPrefix: string
  topicCategory: string
  topicAngle: string
  topicImage: string
  researchNotes: string
  factsJson: string
}

// Second half of the weekly blog pipeline (see ../route.ts for why this is
// split out). Scheduled the same evening, well after the research cron —
// not right after it, because Vercel's free-plan crons are only accurate to
// within the hour, so a short offset couldn't guarantee this runs second.
// If there's nothing pending, that's normal — it just means this week's
// research already failed to verify enough facts (handled, and emailed, by
// the research step) or hasn't run yet.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const notifyEmail = process.env.PERSONAL_NOTIFY_EMAIL

  const pending = await sanity.fetch<PendingResearch | null>(
    `*[_type == 'blogPostResearch'] | order(createdAt asc)[0]{_id, topicSlugPrefix, topicCategory, topicAngle, topicImage, researchNotes, factsJson}`
  )

  if (!pending) {
    return NextResponse.json({ success: false, reason: 'no_pending_research' })
  }

  try {
    const now = new Date()
    const todayISO = formatDate(now)
    const facts: ResearchFact[] = JSON.parse(pending.factsJson)

    // Writing pass — grounded only in the verified facts from the research
    // step, no tools. Uses structured outputs (output_config.format) instead
    // of asking the model to hand-format JSON in prose: a free-text "return
    // JSON" instruction lets the model write literal newlines inside the
    // multi-paragraph "content" string, which breaks strict JSON.parse — the
    // schema constraint prevents that at generation time.
    const writingResponse = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 10000,
      output_config: {
        effort: 'medium',
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              titleEn: { type: 'string' },
              excerpt: { type: 'string' },
              excerptEn: { type: 'string' },
              content: { type: 'string' },
              contentEn: { type: 'string' },
            },
            required: ['title', 'titleEn', 'excerpt', 'excerptEn', 'content', 'contentEn'],
            additionalProperties: false,
          },
        },
      },
      system: buildWritingSystemPrompt(todayISO),
      messages: [
        {
          role: 'user',
          content: `${pending.topicAngle}\n\nПроверени факти (JSON):\n${JSON.stringify(facts)}`,
        },
      ],
    })

    if (writingResponse.stop_reason === 'refusal') {
      throw new Error('Writing request was declined by safety classifiers')
    }

    const post = extractJson<{
      title: string
      titleEn: string
      excerpt: string
      excerptEn: string
      content: string
      contentEn: string
    }>(extractText(writingResponse.content))

    if (!post || !post.title || !post.content || !post.titleEn || !post.contentEn) {
      throw new Error('Writing pass did not return valid JSON')
    }

    const slug = `${pending.topicSlugPrefix}-${formatDate(now)}`
    const docId = `drafts.market-post-${formatDate(now)}-${crypto.randomUUID().slice(0, 8)}`

    const created = await sanity.create({
      _id: docId,
      _type: 'blogPost',
      title: post.title,
      titleEn: post.titleEn,
      slug: { _type: 'slug', current: slug },
      date: formatDate(now),
      category: pending.topicCategory,
      excerpt: post.excerpt,
      excerptEn: post.excerptEn,
      content: post.content,
      contentEn: post.contentEn,
      externalImageUrl: pending.topicImage,
      researchNotes: pending.researchNotes,
    })

    // Verified facts are now a real draft — clear the handoff doc so the
    // next run doesn't pick it up again.
    await sanity.delete(pending._id)

    if (notifyEmail) {
      const previewUrl = `https://www.newkey.bg/api/draft?sanity-preview-secret=cron-preview&redirect=${encodeURIComponent('/blog/' + slug)}`
      await resend.emails.send({
        from: 'New Key Properties <noreply@newkey.bg>',
        to: notifyEmail,
        subject: `Чернова за преглед: ${post.title}`,
        html: buildDraftReadyEmailHtml({
          title: post.title,
          excerpt: post.excerpt,
          category: pending.topicCategory,
          sourceCount: facts.reduce((sum, f) => sum + f.sources.length, 0),
          studioUrl: 'https://www.newkey.bg/studio',
          previewUrl,
        }),
      })
    }

    return NextResponse.json({ success: true, id: created._id, title: post.title, slug })
  } catch (error) {
    console.error('Cron market post write error:', error)
    // Leave the pending research doc in place so the verified facts aren't
    // lost — next week's write run will retry from the same facts.
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
