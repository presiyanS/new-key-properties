/**
 * Populates the titleEn / excerptEn / contentEn fields on all existing
 * blogPost documents in the production dataset, so the /en site shows
 * real English article content instead of falling back to Bulgarian.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/translate-blog-en.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const posts = [
  {
    _id: 'QfFWvDViDgB4wfgoDZdcWW',
    titleEn: 'The Sofia and European Property Market — Spring 2026',
    excerptEn:
      "Since Bulgaria joined the eurozone, the Sofia property market has stabilized. Prices are rising at a moderate pace, demand remains steady, and the European market is showing a strong recovery. Here's what you need to know.",
    contentEn: `The Sofia Property Market — Spring 2026

Bulgaria joined the eurozone on January 1, 2026, and this is arguably the most important event for the real estate market in a decade. The effects are already being felt — and they are not exactly what many people expected.

Prices in Sofia — growth, but more moderate

Housing prices in Sofia have tripled over the past decade — from around EUR 715/sq.m in 2015 to over EUR 2,300/sq.m in early 2026. New construction in sought-after neighborhoods now averages EUR 2,400–2,600/sq.m, while central locations reach EUR 3,500–4,500/sq.m.

Despite this growth, Sofia remains roughly twice as cheap as most European capitals. A one-bedroom apartment costs on average between EUR 110,000 and 140,000, while a three-bedroom apartment costs between EUR 240,000 and 320,000.

After an exceptional year-on-year increase of over 15% in 2025, forecasts for 2026 point to a more moderate rise of 6–10%. The market is stabilizing, not cooling.

The euro changed how people buy

Joining the eurozone did not trigger the speculative boom some expected. Instead, it changed the profile of the buyer. People are now better informed, more patient, and more discerning. They care about energy efficiency, construction quality, and genuine location — not just price per square meter.

International investors are showing greater interest, drawn by the transparency the euro brings. Rental yields in Sofia remain healthy at 5.5–7% annually, making it an attractive investment destination in a European context.

The most sought-after neighborhoods for 2026

According to market data, the strongest demand right now is in:

— Krastova Vada — modern buildings, excellent infrastructure
— Manastirski Livadi — good value for money, close to the metro
— Vitosha (western parts) — nature and urban comfort combined

The secondary market — especially older prefab apartments in outlying neighborhoods — is slowing down. New construction with good energy ratings continues to dominate demand.

What's happening in Europe

The European real estate market is entering a new recovery cycle. Transaction volumes are expected to grow 14% in 2026 to around EUR 275 billion. The residential sector already leads by volume — over 22% of all transactions in Europe.

Financing is getting cheaper — mortgage rate spreads are near five-year lows. In Bulgaria, mortgage rates remain historically low, and banks are offering more fixed-rate products.

What this means for buyers in Sofia

The market right now is healthy and balanced. Good properties still sell fast — in about 28 days on average. If you're looking for a home or an investment in Sofia, 2026 offers reasonable conditions: moderate price growth, accessible financing, and clear prospects.

Speculative buying is declining. Quality buying is on the rise. This is exactly the environment New Key Properties works in — honestly, transparently, with full dedication to every client.

Have questions about the market or a specific property? Get in touch with us — the consultation is free.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77B4fs',
    titleEn: 'The Sofia and Bulgaria Property Market — Current Analysis 2025',
    excerptEn:
      "Bulgaria ranks 2nd in the EU for property price growth. Prices in Sofia now exceed €2,000/sq.m everywhere. Eurozone entry, low interest rates, and foreign buyers — what's driving the market and what to expect.",
    contentEn: `The real estate market in Bulgaria, and in Sofia in particular, posted exceptionally strong growth in 2025. Here are the key figures every buyer, seller, and investor should know.

**Bulgaria — 2nd place in the EU for price growth**

According to Eurostat, in the first quarter of 2025 Bulgaria ranked second in the European Union for year-on-year growth in housing prices — +15.1%. The EU average was just 5.7%. Only Portugal, at 16.3%, ranked ahead of us.

Over the past 10 years, prices in Sofia have risen by nearly 200% — from around €715/sq.m to over €2,100/sq.m.

**Prices by neighborhood in Sofia (2025)**

Premium neighborhoods (€3,600 – €5,000+/sq.m): Yavorov, Oborishte, Lozenets, Iztok, Ivan Vazov, the city center around the Dr. Dyankov monument.

Upper-mid segment (€2,800 – €3,600/sq.m): Mladost, Krastova Vada, Manastirski Livadi, Geo Milev, Dianabad.

Affordable segment (€2,000 – €2,600/sq.m): Nadezhda, Lyulin, Obelya.

The key point: prices below €2,000/sq.m in Sofia are now the exception, not the rule.

**Market dynamics — a strong seller's market**

Properties in Sofia sell in 35–55 days on average. In sought-after neighborhoods like Lozenets and Ivan Vazov — just 20–35 days. 30–40% of properties sell above the asking price. The sale-to-ask price ratio is around 99%.

**The rental market**

Rents in Sofia have risen 5–8% year-on-year. Average rental levels: a one-bedroom apartment — around €580/month; a two-bedroom — €700–1,000/month. In Lozenets and Iztok, one-bedroom rents reach €700–900/month. Gross rental yield in Sofia is around 4.19–4.26% — a compression compared to 2024, since prices are rising faster than rents.

**The eurozone — a key catalyst**

Bulgaria joined the eurozone on January 1, 2026. Anticipation of this event was a major driver of the market throughout 2025 — many buyers rushed to purchase before entry. Analysts expect an additional 10–20% increase after euro adoption, since foreign buyers no longer face currency risk.

**Foreign buyers**

Transactions involving foreign buyers rose 20% in 2024 compared to the previous year. The main markets are the UK, Israel, Germany, Poland, Romania, and Scandinavia.

**Investment outlook**

The most attractive investment property right now: a two-bedroom apartment worth €120,000–180,000 in neighborhoods like Studentski Grad, Krastova Vada, or Mladost, intended for rental. Short-term occupancy in Sofia (Airbnb and similar) is around 55–65% annually.

**Prices in other major cities**

Plovdiv: €1,100–1,400/sq.m. Varna: €1,200–1,600/sq.m. Burgas: €1,000–1,300/sq.m.

**Forecast for 2026–2027**

A moderate annual growth of 6–10% is expected following the exceptional 2024–2025 period. Demand is shifting toward new, energy-efficient buildings. The long-term forecast is 3–7% annual appreciation.

Conclusion: the Sofia market remains strong, but it is no longer cheap. Good properties disappear quickly. If you're considering buying or selling, get in touch with us for a free consultation — we'll give you an honest, up-to-date valuation of your specific property.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jYUGq',
    titleEn: 'Which Sofia Neighborhood Is Best for Property Investment?',
    excerptEn:
      'Dragalevtsi, Mladost, Ovcha Kupel, or Druzhba? We look at which Sofia neighborhoods offer the best yields and price growth potential for 2025–2026.',
    contentEn: `When you invest in property, choosing the right neighborhood matters more than choosing the apartment itself. The right neighborhood can double your returns. The wrong one can freeze your money for years.

Here is our honest take on Sofia's neighborhoods from an investment perspective.

**Dragalevtsi — a hidden gem**

Dragalevtsi is perhaps the most underrated neighborhood right now. It sits at the foot of Vitosha Mountain, the air is clean, it's quiet, and it's green. Five years ago it was considered "too far from the center." Today, with improved infrastructure and rising demand for quality living outside the city center, prices are climbing steadily.

Average price: €2,300–2,500/sq.m for new construction. Growth potential: high. Rental yield: around 4.5–5%.

**Mladost — stable and liquid**

Mladost remains one of the most liquid neighborhoods in Sofia. It's easy to buy and easy to sell — which is crucial for an investor. Proximity to the metro, business parks, and universities ensures constant rental demand.

Average price: €2,000–2,400/sq.m. Rental yield: 4.5–5.5%. Ideal for: two-bedroom apartments for rent.

**Ovcha Kupel 2 — an affordable entry point with good potential**

Ovcha Kupel 2 offers some of the most affordable prices for new construction right now — from €1,600 to €2,100/sq.m. The neighborhood is visibly improving — new infrastructure, cleaner streets, new buildings. For an investor with a limited budget, this is an interesting entry point.

**Druzhba 2 — close to the metro at a reasonable price**

About 150 meters from the Druzhba metro station, new construction here offers good value for money. Prices around €2,500–2,700/sq.m for new builds, with good transport links.

**Manastirski Livadi — for the more discerning buyer**

This neighborhood has already moved into the higher price bracket — €3,200–3,600/sq.m. Better suited to a larger budget, but with good prospects given the profile of the people who live there.

**Our advice**

If you have €150,000–200,000 — consider Mladost or Druzhba 2 with a two-bedroom rental apartment.
If you have €200,000–300,000 — consider Dragalevtsi or Ovcha Kupel with a larger apartment.
If you're after prestige and long-term growth — Dragalevtsi or Vitosha.

Get in touch with us for a free consultation — we'll help you find the specific property that matches your goals.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77B4K6',
    titleEn: '5 Mistakes Buyers Make When Purchasing Property in Sofia',
    excerptEn:
      'After dozens of viewings and deals, we see the same mistakes again and again. These 5 mistakes can cost you tens of thousands of euros — or years of regret.',
    contentEn: `Buying a property is arguably the biggest financial decision of your life. And yet people make it hastily, emotionally, without enough information.

Here are the 5 most common mistakes we see — and how to avoid them.

**Mistake 1: Falling in love with the property before checking the documents**

This is the classic one. You walk into the apartment, you like it, you picture your furniture, you imagine your kids there — and you're already "sold" emotionally. Then it turns out there's a lien on the property, or zoning issues, or a mismatch between the notary deed and reality.

The rule: don't fall in love before a legal check. It costs €200–300 with a lawyer and can save you €20,000+.

**Mistake 2: Looking only at price, not total value**

"This one's cheaper" — but does it have an elevator? What's the maintenance fee? What condition is the building in? Does it need renovation?

A €120,000 property needing €25,000 in renovations and old wiring is more expensive than a €140,000 property in good condition.

**Mistake 3: Skipping a viewing at a different time of day**

You viewed it on a quiet, sunny Sunday afternoon. But on Monday morning, a tram rattles past 20 meters away. Or the neighbors are only noisy in the evenings.

The rule: view the property at least twice — at different times and on different days.

**Mistake 4: Signing without a preliminary contract**

"They told us they'd hold it for us" — a verbal promise means nothing. Without a signed preliminary contract and a deposit, the property isn't yours. And if you wait to "think it over," it may be sold to someone else the next day.

**Mistake 5: Working with an agent who represents both sides**

Many agencies work for both the buyer and the seller at the same time. That's a conflict of interest — whose interest will the agent actually protect during negotiations?

At New Key Properties, we work only for you. Our interest is entirely aligned with yours.

Have questions? Call us for a free consultation — no obligation, no hidden agenda.`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hseiD14',
    titleEn: 'How to Sell Your Property for the Best Price in Sofia',
    excerptEn:
      "The right preparation, pricing, and marketing can add 10–15% to your property's final sale price. Here's what actually works in the Sofia market.",
    contentEn: `Selling a property seems simple — you post a listing, you wait for calls. The reality is different. The difference between a good sale and a bad one can be €15,000–30,000 and six months of waiting.

Here's what actually works.

**Step 1: The right price from the start**

The most common seller mistake is setting the initial price too high "to leave room for negotiation." The result: the property sits on the market for months, people see it and think "why has this been sitting so long — something must be wrong." You end up selling for less than if you'd started realistically.

The rule: a price close to market value from the start generates more interest and fewer discounts.

**Step 2: Preparing the property**

You don't need a full renovation. But small things make a huge difference:
- Declutter and depersonalize the space — buyers need to picture themselves there, not you
- Fix minor defects — a leaking tap, a broken handle, peeling paint
- A fresh coat of neutral paint if the walls are in poor condition
- Clean windows and good lighting for viewings

**Step 3: Professional photos**

70% of buyers decide whether to book a viewing based on the photos alone. Phone photos in a dark room kill interest. A professional property photographer costs €80–150 and pays for itself many times over.

**Step 4: The right marketing strategy**

Posting on Imot.bg alone isn't enough. A good sale includes:
- Quality photos and descriptions across multiple platforms
- Targeted social media
- A network of potential buyers

**Step 5: Negotiation**

Know in advance: what's the minimum price you'll accept. At what price you'd reconsider. What terms matter besides price (timeline, payment method).

At New Key Properties, we help you through the entire process — from pricing to the notary. Get in touch with us for a free valuation of your property.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jYV1I',
    titleEn: 'The Sofia Real Estate Market — 2025 Overview',
    excerptEn:
      'How has the Sofia property market changed? Which neighborhoods are growing fastest? What are the price forecasts? Read our in-depth analysis with real data.',
    contentEn: `The Sofia real estate market continues to show steady growth. In 2025, we're seeing increased demand especially in the Lozenets, Iztok, and Vitosha neighborhoods.

Average apartment prices in central neighborhoods range between EUR 2,000 and 3,500/sq.m, while in outlying neighborhoods prices range between EUR 1,200 and 1,800/sq.m.

Rental rates also continue to rise. A two-bedroom apartment in a good location rents for EUR 700–1,000 per month, and a three-bedroom for EUR 900–1,400.

For investors, rental yields in Sofia range between 4% and 6% annually, an attractive alternative to bank interest rates.

Forecasts for the next 12 months are moderately optimistic — prices in the capital's better locations are expected to rise 5–8%.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jYVv2',
    titleEn: 'Top 5 Neighborhoods in Sofia to Live In',
    excerptEn:
      "Lozenets, Iztok, Vitosha, Mladost, or Borovo? A look at the advantages and drawbacks of the capital's most sought-after neighborhoods.",
    contentEn: `Choosing a neighborhood is one of the most important decisions when buying or renting a home. Here's our honest overview of the top 5 neighborhoods in Sofia.

**1. Lozenets** – Prestigious, green, with excellent infrastructure. Prices: €2,500–3,500/sq.m. Ideal for families and young professionals.

**2. Iztok** – Quiet and green, close to Borisova Gradina park. Prices: €2,200–3,000/sq.m. Favored by diplomats and business people.

**3. Vitosha** – At the foot of the mountain, fresh air, nature. Prices: €1,800–2,500/sq.m. Ideal for nature lovers.

**4. Mladost** – A modern neighborhood with good infrastructure and metro access. Prices: €1,600–2,200/sq.m. Popular among young people.

**5. Borovo** – An established neighborhood with good transport links. Prices: €1,500–2,000/sq.m. A good balance of quality and price.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77B4yk',
    titleEn: 'Investing in Property in Sofia — Is It Worth It?',
    excerptEn:
      'We analyze the profitability of real estate investment in Sofia. Which properties offer the best returns, and how do you choose the right one?',
    contentEn: `Investing in property remains one of the most stable ways to preserve and grow capital in Bulgaria.

For a buy-to-let purchase, the average yield in Sofia is between 4% and 6% annually. Smaller apartments (studios and one-bedrooms) typically deliver higher yields due to their lower purchase price and steady demand.

Key factors when choosing an investment property:
- Location (neighborhood, proximity to the metro, transport links)
- Technical condition and renovation needs
- Rental potential
- Liquidity on resale

Our team provides free consultations on investment properties. Get in touch with us for a personalized analysis.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jYWDc',
    titleEn: 'How to Buy Property Without Mistakes — A Practical Guide',
    excerptEn:
      'From viewing to notary — everything you need to know when buying property in Bulgaria. A practical handbook from our brokers.',
    contentEn: `Buying property is one of the most significant financial decisions in life. Here are the key steps to avoid costly mistakes.

**1. Set your budget** – Include all costs: purchase price, notary fees (around 3–4%), transfer tax (around 2–3%), and agency commission.

**2. Check the documents** – Verify ownership, liens, mortgages, and zoning status. Work with a trusted lawyer.

**3. Technical inspection** – Carefully inspect the technical condition. Check the utilities, the roof, and the common areas.

**4. Negotiation** – Don't accept the first price. In most cases there's room to negotiate 3–10%.

**5. Preliminary contract** – Mandatory before the final notary deed. Ensure you have legal protection.

**6. Notary deed** – The final step. Make sure everything is in order before signing.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77B57S',
    titleEn: 'Renting or Buying — Which Makes More Sense in 2025?',
    excerptEn:
      'Given current interest rates and property prices, is it more cost-effective to rent or to buy? We crunch the real numbers for Sofia.',
    contentEn: `The question "rent or buy?" has no universal answer — it depends on your situation, plans, and financial position.

**Arguments for buying:**
- You build equity and capital
- Protection against inflation
- Freedom to make changes
- With a mortgage, the monthly payment can be close to rent

**Arguments for renting:**
- Greater flexibility
- Lower upfront capital
- No maintenance costs
- Suitable if you're uncertain about where you'll live

**The real numbers for 2025 in Sofia:**
A two-bedroom apartment in Lozenets: purchase ~EUR 150,000, rent ~EUR 850/month.
With a mortgage (20% down payment, 25 years, 3.5%): ~EUR 640/month.

In this specific example, buying works out more cost-effective in the long run — provided you have the initial capital.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77B5NQ',
    titleEn: 'Rental Agreements — What to Watch Out For',
    excerptEn:
      'What clauses should a good rental agreement include? How to protect yourself from unpleasant surprises as a tenant or landlord.',
    contentEn: `A well-drafted rental agreement protects both parties. Here are the essential elements.

**Essential clauses:**
- An exact description of the property and its furnishings
- The contract term and termination conditions
- The rent amount and payment method
- The deposit – amount and conditions for its return
- Responsibilities for repairs and maintenance
- Rules on pets, smoking, etc.

**Common mistakes:**
- An incomplete description of the property at handover
- Unclear deposit conditions
- No clause for rent indexation
- Unspecified responsibility for utility costs

**Our advice:** always prepare a handover/acceptance protocol with a detailed description of the technical condition and photos.

New Key Properties provides standardized agreements, drafted with legal assistance, for all our clients.`,
  },
]

async function run() {
  let ok = 0
  let failed = 0
  for (const { _id, titleEn, excerptEn, contentEn } of posts) {
    try {
      console.log(`Patching ${_id}…`)
      await client.patch(_id).set({ titleEn, excerptEn, contentEn }).commit()
      ok++
    } catch (err) {
      failed++
      console.error(`❌  Failed to patch ${_id}:`, err.message)
    }
  }
  console.log(`✅  Done. Patched ${ok}/${posts.length} posts${failed ? `, ${failed} failed` : ''}.`)
}

run().catch((err) => {
  console.error('❌  Failed:', err.message)
  process.exit(1)
})
