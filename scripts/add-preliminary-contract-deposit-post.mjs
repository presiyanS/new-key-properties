/**
 * Adds a new blog post: the preliminary contract (предварителен договор) and the
 * deposit (капаро / задатък) when buying or selling a property. Chosen because
 * no existing post explains it - older posts only mention "don't pay a deposit
 * before checking the property" in passing (2026-03-10, 2026-08-31).
 *
 * Written by hand in Claude Code (not via the market-post cron / Anthropic
 * API). Facts checked 2026-10-12 directly against the law texts (lex.bg was
 * behind a Cloudflare check, so the same consolidated texts were read on
 * ciela.net and trudipravo.bg): ЗЗД чл. 19, 93; ГПК чл. 362-364; ЗС чл. 114-115.
 * Landed as a Sanity DRAFT; proofread separately before publishing.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-preliminary-contract-deposit-post.mjs
 */

import { createClient } from '@sanity/client'
import crypto from 'crypto'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const slug = 'predvaritelen-dogovor-i-kaparo-kakvo-da-znaete'

const content = `Намерили сте подходящия имот, договорили сте цената и следващата стъпка е предварителният договор. Много купувачи и продавачи го приемат за формалност преди "истинската" сделка при нотариуса. Всъщност точно предварителният договор определя какво ще се случи, ако нещо се обърка - ако банката откаже кредита, ако продавачът получи по-добра оферта или ако купувачът се откаже. В тази статия обясняваме какво казва законът за предварителния договор и за капарото и на какво да обърнете внимание, преди да подпишете и да преведете пари.

**Какво представлява предварителният договор**

С предварителния договор купувачът и продавачът се задължават да сключат окончателен договор - нотариален акт - при определени условия и в определен срок. Важно е да знаете, че той не прехвърля собствеността. Докато не бъде подписан нотариалният акт, имотът остава собственост на продавача, а купувачът има само право да изисква сделката да бъде сключена.

Според чл. 19 от Закона за задълженията и договорите (ЗЗД) предварителният договор за покупка на имот трябва да бъде сключен в писмена форма. Устното обещание "ще Ви запазим апартамента" не Ви дава никаква правна защита. Нотариална заверка на подписите не е задължителна, но е важно договорът да бъде подписан от всички собственици на имота - лично или чрез пълномощник. Собственик, който не е подписал, не е обвързан от договора.

**Какво трябва да съдържа**

Законът изисква предварителният договор да съдържа уговорки относно съществените условия на окончателния договор. Ако те липсват, по-късно съдът може да откаже да обяви договора за окончателен. На практика проверете дали в договора са посочени:

- **Точно описание на имота** - адрес, идентификатор по кадастралната карта, площ и прилежащите части (мазе, таванско помещение, паркомясто, ако има такова).
- **Цената в евро и начинът на плащане** - каква сума се плаща като капаро, каква при нотариалния акт и дали част от нея идва от банков кредит.
- **Срокът за подписване на нотариалния акт** - конкретна дата или ясно определен период.
- **Кой поема разходите по сделката** - местния данък, нотариалната такса и таксата за вписване.
- **В какво състояние се предава имотът** - кое обзавеждане остава, кога имотът се освобождава и кога се предават ключовете.
- **Какво става, ако банката откаже кредит** - ако купувате с ипотечен кредит, тази клауза е една от най-важните в целия договор.

**Капаро или аванс: разликата е съществена**

Капарото (в закона се нарича "задатък") е уредено в чл. 93 от ЗЗД. То служи като доказателство, че договорът е сключен, и гарантира изпълнението му. Законът не определя минимален или максимален размер - сумата се договаря между страните.

Важно е в договора сумата да бъде изрично посочена като задатък (капаро). Ако е описана само като "аванс" или "част от цената", правилата за задържане и за връщане в двоен размер, описани по-долу, не се прилагат. Тогава при разваляне на договора авансът подлежи на връщане, а евентуалните вреди трябва да се доказват отделно.

**Какво става, ако купувачът се откаже**

Ако купувачът, който е дал капарото, не изпълни задължението си - например не се яви при нотариуса или не плати цената в срок - продавачът може да се откаже от договора и да задържи капарото.

**Какво става, ако продавачът се откаже**

Ако продавачът, който е получил капарото, не изпълни задължението си - например продаде имота на друг или откаже да подпише нотариалния акт - купувачът може да се откаже от договора и да поиска капарото в двоен размер.

Пример: платили сте капаро от 15 000 евро, а продавачът се отказва от сделката. Имате право да получите 30 000 евро - Вашите 15 000 евро и още толкова. Ако продавачът не плати доброволно, сумата се търси по съдебен ред.

**Когато искате имота, а не парите**

Вместо да се откажете от договора, можете да поискате той да бъде изпълнен. Чл. 19, ал. 3 от ЗЗД позволява на всяка от страните да предяви иск за сключване на окончателния договор. На практика съдът обявява предварителния договор за окончателен и решението му замества нотариалния акт. В този случай капарото не се връща в двоен размер, а обезщетението за евентуалните вреди се определя по общите правила.

Ако като купувач предявите такъв иск, има няколко условия, които е добре да знаете предварително:

- **Исковата молба се вписва в Имотния регистър.** Според чл. 114 от Закона за собствеността правата, които трети лица придобият върху имота след вписването, не могат да се противопоставят на купувача. Затова при спор е важно да действате бързо - ако продавачът продаде имота на друг и сделката бъде вписана преди Вашата искова молба, ще можете да търсите само пари, но не и самия имот.
- **Съдът проверява дали продавачът е собственик** и дали са налице условията за прехвърляне на имота по нотариален ред (чл. 363 от Гражданския процесуален кодекс - ГПК).
- **Трябва да платите остатъка от цената в двуседмичен срок** от влизането в сила на решението, ако по договора го дължите при нотариалния акт. Ако не го направите, по искане на продавача съдът обезсилва решението (чл. 362 от ГПК).
- **Разходите по прехвърлянето са за Ваша сметка.** Съдът не издава препис от решението, докато не докажете, че са платени разходите по прехвърлянето и дължимите данъци и такси за имота (чл. 364 от ГПК).
- **Решението трябва да се отбележи в Имотния регистър в шестмесечен срок.** След изтичането му вписването на исковата молба губи действието си (чл. 115 от Закона за собствеността).

**Какво да направите, преди да подпишете**

- **Проверете имота, преди да платите капаро.** Поискайте нотариалния акт на продавача и удостоверение за тежести от Агенцията по вписванията. Проверете дали собствениците по документи са същите хора, които подписват договора.
- **Ако имотът е придобит по време на брак**, обикновено е съпружеска имуществена общност и за продажбата е необходимо участието на двамата съпрузи. Най-добре е и двамата да подпишат предварителния договор.
- **Плащайте капарото по банков път** с ясно основание - например "задатък по предварителен договор от [дата]". Така имате доказателство каква сума и кога сте платили.
- **Предвидете реалистичен срок** за нотариалния акт. При покупка с кредит одобрението и оценката от банката отнемат време. Твърде краткият срок може да Ви постави в нарушение на договора, въпреки че забавянето не зависи от Вас.
- **Не подписвайте под натиск.** Фрази като "има и друг купувач, трябва да подпишем днес" са чести. Добрите имоти наистина се продават бързо, но един ден за проверка на документите струва много по-малко от загубено капаро.

**Заключение**

Предварителният договор е най-важният документ преди нотариалния акт. Именно от него зависи дали при проблем ще загубите капарото си, ще го получите в двоен размер или ще можете да придобиете имота чрез съда. Тази статия представя общите правила и не замества консултацията с юрист при конкретна сделка. Ако купувате или продавате имот в София, свържете се с нас на 0879 826 292 - ще прегледаме документите и договора заедно с Вас, преди да платите или да получите капаро. Работим с ограничен брой клиенти на месец, за да отделим на всеки нужното внимание.`

const contentEn = `You've found the right property, agreed on the price, and the next step is the preliminary contract. Many buyers and sellers treat it as a formality before the "real" deal at the notary. In fact, it's the preliminary contract that decides what happens if something goes wrong - if the bank turns down the loan, if the seller gets a better offer, or if the buyer changes their mind. In this article we explain what Bulgarian law says about the preliminary contract and the deposit, and what to watch for before you sign and transfer any money.

**What a preliminary contract is**

With a preliminary contract, the buyer and seller commit to signing the final contract - the notary deed - on agreed terms and by an agreed date. It's important to know that it does not transfer ownership. Until the notary deed is signed, the property still belongs to the seller, and the buyer only has the right to demand that the sale goes ahead.

Under Article 19 of the Obligations and Contracts Act (ЗЗД), a preliminary contract to buy a property must be made in writing. A verbal promise like "we'll hold the apartment for you" gives you no legal protection at all. Having the signatures notarised isn't required, but it's important that every owner of the property signs the contract - in person or through someone holding their power of attorney. An owner who hasn't signed isn't bound by it.

**What it should contain**

The law requires the preliminary contract to cover the essential terms of the final contract. If they're missing, a court may later refuse to declare the contract final. In practice, check that the contract states:

- **An exact description of the property** - address, cadastral identifier, floor area and any attached spaces (basement storage, attic room, parking space, if there is one).
- **The price in euro and how it will be paid** - how much is paid as a deposit, how much at the notary, and whether part of it comes from a bank loan.
- **The deadline for signing the notary deed** - a specific date or a clearly defined period.
- **Who covers the transaction costs** - the local transfer tax, the notary fee and the registration fee.
- **The condition the property is handed over in** - which furniture stays, when the property will be vacated and when the keys are handed over.
- **What happens if the bank refuses the loan** - if you're buying with a mortgage, this is one of the most important clauses in the whole contract.

**Deposit or advance payment: the difference matters**

The deposit (called "задатък" in the law, and commonly "капаро") is governed by Article 93 of the Obligations and Contracts Act. It serves as proof that the contract was concluded and as a guarantee that it will be performed. The law sets no minimum or maximum amount - it's agreed between the parties.

It's important that the contract explicitly describes the sum as a deposit (задатък / капаро). If it's described only as an "advance" or "part of the price", the rules on keeping it or returning it double, described below, don't apply. In that case, if the contract is terminated, the advance has to be refunded, and any losses must be proven separately.

**What happens if the buyer backs out**

If the buyer who paid the deposit fails to meet their obligations - for example, doesn't show up at the notary or doesn't pay the price on time - the seller can terminate the contract and keep the deposit.

**What happens if the seller backs out**

If the seller who received the deposit fails to meet their obligations - for example, sells the property to someone else or refuses to sign the notary deed - the buyer can terminate the contract and claim double the deposit.

Example: you've paid a €15,000 deposit and the seller pulls out of the deal. You're entitled to €30,000 - your own €15,000 plus the same amount again. If the seller doesn't pay voluntarily, the amount has to be claimed through the courts.

**When you want the property, not the money**

Instead of terminating the contract, you can ask for it to be performed. Article 19(3) of the Obligations and Contracts Act allows either party to file a claim for the final contract to be concluded. In practice, the court declares the preliminary contract final, and its judgment takes the place of the notary deed. In that case the deposit isn't returned double, and compensation for any losses is assessed under the general rules.

If you file such a claim as the buyer, there are a few conditions to know about in advance:

- **The claim is entered in the Property Register.** Under Article 114 of the Property Act, rights that third parties acquire in the property after that registration can't be enforced against the buyer. That's why acting quickly matters in a dispute - if the seller sells the property to someone else and that sale is registered before your claim, you'll only be able to seek money, not the property itself.
- **The court checks that the seller actually owns the property** and that all the conditions for transferring it by notary deed are met (Article 363 of the Civil Procedure Code).
- **You must pay the rest of the price within two weeks** of the judgment becoming final, if the contract says it's due at the notary. If you don't, the court will annul the judgment at the seller's request (Article 362 of the Civil Procedure Code).
- **You pay the transfer costs.** The court won't issue a copy of the judgment until you prove that the transfer costs and any taxes and fees owed on the property have been paid (Article 364 of the Civil Procedure Code).
- **The judgment must be noted in the Property Register within six months.** After that, the registration of the claim loses its effect (Article 115 of the Property Act).

**What to do before you sign**

- **Check the property before paying a deposit.** Ask for the seller's notary deed and a certificate of encumbrances from the Registry Agency. Make sure the owners on the documents are the same people signing the contract.
- **If the property was acquired during a marriage**, it is usually jointly owned by both spouses, and both need to take part in the sale. It's best for both of them to sign the preliminary contract too.
- **Pay the deposit by bank transfer** with a clear payment reference - for example, "deposit under preliminary contract dated [date]". That way you have proof of how much you paid and when.
- **Allow a realistic deadline** for the notary deed. When buying with a loan, the bank's approval and valuation take time. Too short a deadline can put you in breach of the contract even though the delay is out of your hands.
- **Don't sign under pressure.** Lines like "there's another buyer, we need to sign today" are common. Good properties really do sell fast, but a day spent checking the documents costs far less than a lost deposit.

**Conclusion**

The preliminary contract is the most important document before the notary deed. It decides whether, if something goes wrong, you lose your deposit, get it back double, or can still acquire the property through the courts. This article sets out the general rules and doesn't replace advice from a lawyer on a specific transaction. If you're buying or selling a property in Sofia, contact us at 0879 826 292 - we'll go through the documents and the contract with you before you pay or receive a deposit. We work with a limited number of clients per month so we can give each one the attention they need.`

const researchNotes = `Тема: предварителен договор и капаро (задатък) при покупко-продажба на имот. Избрана, защото нито една от съществуващите 24 статии не я разглежда - проверено пълното съдържание на всички статии за "капаро", "предварител", "чл. 19": досегашните статии само споменават капарото мимоходом ("не плащайте капаро преди проверка" - 2026-03-10 и 2026-08-31) и не обясняват правилата за задържане / двоен размер или иска по чл. 19, ал. 3 ЗЗД.

Написана ръчно в Claude Code на 2026-10-12, НЕ чрез cron-а / Anthropic API.

ИЗТОЧНИЦИ - първичен текст на законите (lex.bg беше зад Cloudflare проверка, затова същите консолидирани текстове са прочетени на ciela.net и trudipravo.bg):
- ЗЗД чл. 19 (писмена форма, съществени условия, иск за сключване на окончателен договор) и чл. 93 (задатък - задържане / двоен размер; при иск за изпълнение - обезщетение по общите правила). Текстовете са непроменени от ДВ бр. 12/1993 г.
- ГПК чл. 362 (двуседмичен срок за насрещното задължение, обезсилване), чл. 363 (проверка на собствеността), чл. 364 (разноски, препис след плащане на данъци и такси).
- ЗС чл. 114, б. "б" (вписване на исковата молба, непротивопоставимост на права, придобити след вписването) и чл. 115 (шестмесечен срок за отбелязване на решението).
- Аванс срещу задатък и СИО (участие на двамата съпрузи) - установени правила в практиката и Семейния кодекс; формулирани предпазливо ("обикновено").

Примерът (15 000 / 30 000 евро) е илюстративно изчисление, не пазарни данни.
Умишлено НЕ са включени: съдебни такси и срокове на делата (зависят от конкретния случай), конкретен "обичаен" размер на капарото (законът не определя такъв).

Снимка: Съдебната палата, бул. "Витоша", София (Wikimedia Commons, "Palace of Justice, Sofia 2012 PD 001.jpg", CC BY-SA 3.0) - не се ползва в друга статия.`

const draftId = `drafts.${crypto.randomBytes(12).toString('hex')}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Предварителен договор и капаро: какво да знаете, преди да подпишете',
  titleEn: 'Preliminary contract and deposit: what to know before you sign',
  slug: { _type: 'slug', current: slug },
  excerpt: 'Преди да платите капаро за имот, е добре да знаете какво точно подписвате. Обясняваме какво трябва да съдържа предварителният договор, кога капарото се губи или се връща в двоен размер и как съдът може да обяви договора за окончателен.',
  excerptEn: "Before you pay a deposit on a property, it's worth knowing exactly what you're signing. We explain what a preliminary contract should contain, when a deposit is lost or returned double, and how a court can declare the contract final.",
  content,
  contentEn,
  date: '2026-10-12',
  category: 'Правни съвети',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Palace_of_Justice%2C_Sofia_2012_PD_001.jpg',
  researchNotes,
}

const existing = await client.fetch(
  `*[_type=="blogPost" && slug.current==$slug][0]{_id}`,
  { slug }
)
if (existing) {
  console.error('❌  A post with this slug already exists:', existing._id)
  process.exit(1)
}

const created = await client.createIfNotExists(doc)
console.log('✅  Created blog post DRAFT:', created._id, created.slug.current)
