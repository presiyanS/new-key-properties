import { initBotId } from 'botid/client/core'

// Invisible bot check (Vercel BotID) for the public forms. Every path listed
// here must also call screenSubmission() or checkBotId() in its route on the
// server - the two sides only work as a pair.
initBotId({
  protect: [
    { path: '/api/contact', method: 'POST' },
    { path: '/api/submit-consultation', method: 'POST' },
    { path: '/api/valuation', method: 'POST' },
    { path: '/api/save-search', method: 'POST' },
  ],
})
