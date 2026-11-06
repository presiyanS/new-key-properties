import { checkBotId } from 'botid/server'

type Verdict = 'ok' | 'honeypot' | 'bot'

// Decides whether a form submission should be processed. Call this first in a
// route, before anything is emailed, saved or sent to Make.com/HubSpot.
//   'honeypot' - the hidden field was filled in: answer as if it worked and
//                do nothing, so the bot gets no hint that it was caught.
//   'bot'      - Vercel BotID flagged it: return an error. Not a fake success,
//                because if a real client is ever misjudged they must see the
//                form's "please call us" message rather than believe it arrived.
export async function screenSubmission(honeypot?: unknown): Promise<Verdict> {
  if (honeypot) {
    console.warn('Form submission dropped: honeypot filled')
    return 'honeypot'
  }

  try {
    const { isBot } = await checkBotId()
    if (isBot) {
      console.warn('Form submission blocked: flagged by BotID')
      return 'bot'
    }
  } catch (err) {
    // A BotID outage must never cost a real lead - one spam message is far
    // cheaper than a lost client.
    console.error('BotID check failed, letting submission through:', err)
  }

  return 'ok'
}
