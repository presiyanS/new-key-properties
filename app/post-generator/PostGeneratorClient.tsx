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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-green py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">
            Генератор на <span className="text-brand-gold">постове</span>
          </h1>
          <p className="text-white/70 text-lg">
            {categories.reduce((acc, c) => acc + c.topics.length, 0)} готови поста за 3 платформи — редактирай и публикувай
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
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${charColor}`}>
                    {charCount.toLocaleString()} / {charLimit.toLocaleString()}
                  </span>
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
          </div>
        </div>
      </div>
    </div>
  )
}
