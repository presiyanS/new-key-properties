'use client'

import { useState } from 'react'
import { categories, type Platform } from './posts'

const platforms: { id: Platform; label: string; icon: string; limit: number }[] = [
  { id: 'instagram', label: 'Instagram', icon: '📸', limit: 2200 },
  { id: 'facebook', label: 'Facebook', icon: '📘', limit: 5000 },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', limit: 3000 },
]

export default function PostGeneratorClient() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id)
  const [activeTopicId, setActiveTopicId] = useState(categories[0].topics[0].id)
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [post, setPost] = useState(categories[0].topics[0].posts['instagram'])
  const [copied, setCopied] = useState(false)
  const [hashCopied, setHashCopied] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [aiPostType, setAiPostType] = useState('listing')
  const [aiTone, setAiTone] = useState('neutral')
  const [aiDetails, setAiDetails] = useState('')
  const [generating, setGenerating] = useState(false)
  const [aiError, setAiError] = useState('')

  const activeCategory = categories.find(c => c.id === activeCategoryId)!
  const activeTopic = activeCategory.topics.find(t => t.id === activeTopicId)!
  const selectedPlatform = platforms.find(p => p.id === platform)!

  const charCount = post.length
  const charLimit = selectedPlatform.limit
  const charPercent = Math.min((charCount / charLimit) * 100, 100)
  const charColor = charPercent > 90 ? 'text-red-500' : charPercent > 70 ? 'text-yellow-500' : 'text-green-600'
  const barColor = charPercent > 90 ? 'bg-red-400' : charPercent > 70 ? 'bg-yellow-400' : 'bg-green-500'

  function selectCategory(categoryId: string) {
    const cat = categories.find(c => c.id === categoryId)!
    setActiveCategoryId(categoryId)
    setActiveTopicId(cat.topics[0].id)
    setPost(cat.topics[0].posts[platform])
  }

  function selectTopic(topicId: string) {
    setActiveTopicId(topicId)
    const topic = activeCategory.topics.find(t => t.id === topicId)!
    setPost(topic.posts[platform])
  }

  function selectPlatform(p: Platform) {
    setPlatform(p)
    setPost(activeTopic.posts[p])
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(post)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleHashtagCopy() {
    const hashtags = post.match(/#\S+/g)?.join(' ') ?? ''
    if (!hashtags) return
    await navigator.clipboard.writeText(hashtags)
    setHashCopied(true)
    setTimeout(() => setHashCopied(false), 2000)
  }

  async function handleAiGenerate() {
    if (!aiDetails.trim()) return
    setGenerating(true)
    setAiError('')
    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, postType: aiPostType, tone: aiTone, details: aiDetails }),
      })
      const data = await res.json()
      if (data.post) {
        setPost(data.post)
      } else {
        setAiError(data.error ?? 'Неизвестна грешка. Провери конзолата.')
      }
    } catch (e: any) {
      setAiError(e?.message ?? 'Мрежова грешка — провери интернет връзката.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-green py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">
            Генератор на <span className="text-brand-gold">постове</span>
          </h1>
          <p className="text-white/70 text-lg">
            {categories.reduce((acc, c) => acc + c.topics.length, 0)} готови поста · 3 платформи · AI генератор с избор на тон
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1: Categories + Topics */}
          <div className="space-y-4">
            {/* Categories */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Категория</p>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => selectCategory(cat.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
                      activeCategoryId === cat.id
                        ? 'bg-brand-green text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="font-medium text-sm">{cat.label}</span>
                    <span className={`ml-auto text-xs rounded-full px-2 py-0.5 ${
                      activeCategoryId === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {cat.topics.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Тема</p>
              <div className="space-y-1">
                {activeCategory.topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => selectTopic(topic.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm ${
                      activeTopicId === topic.id
                        ? 'bg-brand-gold/10 text-brand-green border border-brand-gold/30 font-semibold'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2+3: Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Platform tabs */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex gap-2">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => selectPlatform(p.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      platform === p.id
                        ? 'bg-brand-green text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{activeCategory.label}</span>
                  <h3 className="font-bold text-brand-green">{activeTopic.label}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono ${charColor}`}>
                    {charCount.toLocaleString()} / {charLimit.toLocaleString()}
                  </span>
                  <button
                    onClick={handleHashtagCopy}
                    title="Копирай само хаштаговете"
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                      hashCopied
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                    }`}
                  >
                    # {hashCopied ? 'Копирано!' : 'Хаштагове'}
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                      copied
                        ? 'bg-green-100 text-green-700'
                        : 'bg-brand-gold text-brand-green hover:bg-brand-gold/90'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Копирано!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                        Копирай
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-1 mb-4">
                <div className={`h-1 rounded-full transition-all ${barColor}`} style={{ width: `${charPercent}%` }} />
              </div>

              <textarea
                value={post}
                onChange={e => setPost(e.target.value)}
                rows={18}
                className="w-full text-sm text-gray-700 leading-relaxed resize-none border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
              />

              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-400">
                  {platform === 'instagram' && '💡 Публикувай 12:00–14:00 или 18:00–20:00'}
                  {platform === 'facebook' && '💡 Сряда–петък следобед работи най-добре'}
                  {platform === 'linkedin' && '💡 Вторник–четвъртък 8:00–10:00'}
                </p>
                <button
                  onClick={() => setPost(activeTopic.posts[platform])}
                  className="text-xs text-gray-400 hover:text-brand-green transition-colors"
                >
                  ↺ Нулирай промените
                </button>
              </div>
            </div>

            {/* Quick nav */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Бърза навигация</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat =>
                  cat.topics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        if (cat.id !== activeCategoryId) {
                          setActiveCategoryId(cat.id)
                        }
                        setActiveTopicId(topic.id)
                        setPost(topic.posts[platform])
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        activeTopicId === topic.id
                          ? 'bg-brand-green text-white border-brand-green'
                          : 'border-gray-200 text-gray-500 hover:border-brand-green hover:text-brand-green'
                      }`}
                    >
                      {cat.icon} {topic.label}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* AI Generator */}
            <div className="bg-white rounded-2xl shadow-sm border border-brand-gold/20 overflow-hidden">
              <button
                onClick={() => setAiOpen(!aiOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-gold/10 rounded-xl flex items-center justify-center text-lg shrink-0">✨</div>
                  <div>
                    <p className="font-bold text-brand-green text-sm">AI Генератор</p>
                    <p className="text-xs text-gray-400">Генерирай нов пост по твои детайли + тон</p>
                  </div>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${aiOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {aiOpen && (
                <div className="border-t border-gray-100 p-4 space-y-4">
                  {/* Post type */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Тип пост</p>
                    <select
                      value={aiPostType}
                      onChange={e => setAiPostType(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-white"
                    >
                      <option value="listing">🏠 Обява за имот</option>
                      <option value="market_tip">📊 Пазарен съвет</option>
                      <option value="behind_scenes">🔑 Зад кулисите</option>
                      <option value="market_fact">📈 Пазарен факт</option>
                      <option value="client_story">❤️ История на клиент</option>
                      <option value="urgent">⚡ Спешна оферта</option>
                    </select>
                  </div>

                  {/* Tone selector */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Тон</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'neutral', label: 'Неутрален', icon: '⚖️' },
                        { id: 'friendly', label: 'Приятелски', icon: '😊' },
                        { id: 'authoritative', label: 'Авторитетен', icon: '🎯' },
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => setAiTone(t.id)}
                          className={`text-xs py-2.5 px-2 rounded-xl border transition-all font-medium flex flex-col items-center gap-1 ${
                            aiTone === t.id
                              ? 'bg-brand-green text-white border-brand-green shadow-sm'
                              : 'border-gray-200 text-gray-600 hover:border-brand-green/50 hover:text-brand-green'
                          }`}
                        >
                          <span className="text-base">{t.icon}</span>
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Детайли</p>
                    <textarea
                      value={aiDetails}
                      onChange={e => setAiDetails(e.target.value)}
                      rows={4}
                      placeholder={
                        aiPostType === 'listing'
                          ? 'Пример: 2-стаен в Лозенец, 65 кв.м, ет.4 от 6, АКТ16, цена €175,000, добро разпределение, тихо място, близо до парк...'
                          : 'Опишете темата, историята или информацията за поста...'
                      }
                      className="w-full text-sm border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green placeholder-gray-300"
                    />
                  </div>

                  {/* Error message */}
                  {aiError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600">
                      ⚠️ {aiError}
                    </div>
                  )}

                  {/* Generate button */}
                  <button
                    onClick={handleAiGenerate}
                    disabled={generating || !aiDetails.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3.5 rounded-xl hover:bg-brand-green/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {generating ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Генерирам...
                      </>
                    ) : (
                      <>
                        <span>✨</span>
                        Генерирай с AI
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-400 text-center">Резултатът се зарежда директно в редактора горе</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
