'use client'

import type { FC } from 'react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Textarea from 'rc-textarea'
import {
  RiArrowDownLine,
  RiFootprintLine,
  RiLeafLine,
  RiMap2Line,
  RiPlantLine,
  RiRecycleLine,
  RiSendPlane2Line,
  RiSunLine,
  RiTentLine,
} from '@remixicon/react'
import type { ChatItem } from '@/types/app'
import type { CitationItem } from '@/app/components/chat/type'
import StreamdownMarkdown from '@/app/components/base/streamdown-markdown'
import ImageGallery from '@/app/components/base/image-gallery'
import s from './style.module.css'

export interface TerraMindSuggestedPrompt {
  title: string
  desc?: string
  prompt: string
}

export interface TerraMindChatProps {
  title?: string
  subtitle?: string
  chatList: ChatItem[]
  isResponding?: boolean
  suggestedPrompts?: TerraMindSuggestedPrompt[]
  onSend: (message: string) => void
}

const isAnswerItem = (item: ChatItem) => item.isAnswer
const hasRenderableChatItem = (item: ChatItem) => {
  if (!isAnswerItem(item)) {
    return true
  }

  return !!(
    item.content?.trim()
    || item.citation?.length
    || item.message_files?.length
    || item.agent_thoughts?.length
    || item.workflowProcess
  )
}

const TerraMindChat: FC<TerraMindChatProps> = ({
  title = 'Your guide to cabin living & wild trails',
  subtitle = 'Cabi helps you plan scenic hiking trails and embrace sustainable outdoor living. From trail planning to cozy cabin stays, explore responsibly.',
  chatList,
  isResponding,
  suggestedPrompts = [],
  onSend,
}) => {
  const [query, setQuery] = useState('')
  const [expandedCitationMessages, setExpandedCitationMessages] = useState<Record<string, boolean>>({})
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const queryRef = useRef('')
  const messagesRef = useRef<HTMLDivElement>(null)
  const visibleChatList = useMemo(() => chatList.filter(hasRenderableChatItem), [chatList])
  const hasMessages = visibleChatList.length > 0
  const promptIcons = [RiFootprintLine, RiLeafLine, RiTentLine]
  const featureCards = [
    { title: 'Trail Maps', desc: 'Discover hidden hiking paths', Icon: RiMap2Line },
    { title: 'Eco Tips', desc: 'Leave no trace & green travel', Icon: RiRecycleLine },
    { title: 'Wildlife Guide', desc: 'Spot local flora and fauna', Icon: RiPlantLine },
    { title: 'Weather Alerts', desc: 'Trail and cabin weather updates', Icon: RiSunLine },
  ]

  const autoPrompts = useMemo(() => {
    if (suggestedPrompts.length > 0) {
      return suggestedPrompts.slice(0, 3)
    }

    return [
      {
        title: 'EV Charging',
        desc: 'Charging station availability by location.',
        prompt: 'Are there charging stations for electric cars at every location?',
      },
      {
        title: 'Horsterwold Packing',
        desc: 'What to bring for the floating cabin.',
        prompt: 'What should I bring for the Horsterwold cabin?',
      },
      {
        title: 'Dogs Allowed',
        desc: 'Pet policy across cabin stays.',
        prompt: 'Are dogs allowed at the cabins?',
      },
    ] satisfies TerraMindSuggestedPrompt[]
  }, [suggestedPrompts])

  const scrollToBottom = () => {
    const el = messagesRef.current
    if (!el) {
      return
    }
    el.scrollTop = el.scrollHeight
  }

  const handleMessagesScroll = () => {
    const el = messagesRef.current
    if (!el) {
      return
    }
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120
    setShowScrollButton(!isNearBottom)
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatList, isResponding])

  const handleSend = () => {
    if (isResponding) {
      return
    }
    const value = queryRef.current.trim()
    if (!value) {
      return
    }
    onSend(value)
    setQuery('')
    queryRef.current = ''
  }

  const handlePromptSend = (prompt: string) => {
    if (isResponding) {
      return
    }
    onSend(prompt)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderBubbleImages = (item: ChatItem) => {
    const srcs = (item.message_files || [])
      .filter((f: any) => f?.type === 'image' && typeof f?.url === 'string')
      .map((f: any) => f.url)
    if (!srcs.length) {
      return null
    }
    return <div className="mb-2"><ImageGallery srcs={srcs} /></div>
  }

  const renderCitations = (item: ChatItem) => {
    const citations = item.citation as CitationItem[] | undefined
    if (!citations || citations.length === 0) {
      return null
    }

    const visibleCitations = citations.slice(0, 5)
    const isDetailsOpen = !!expandedCitationMessages[item.id]
    const sourceNames = Array.from(new Set(visibleCitations.map((c, idx) => c.document_name || c.dataset_name || `Source ${idx + 1}`)))
    const sourceSummary = sourceNames.length > 0
      ? `Sources: ${sourceNames.slice(0, 2).join(', ')}${sourceNames.length > 2 ? ` +${sourceNames.length - 2} more` : ''}`
      : 'Sources are available'
    const toggleDetails = () => {
      setExpandedCitationMessages((prev) => {
        const nextOpen = !prev[item.id]
        return { ...prev, [item.id]: nextOpen }
      })
      if (isDetailsOpen && expandedCitation?.startsWith(`${item.id}-`)) {
        setExpandedCitation(null)
      }
    }

    return (
      <div className={s.citations}>
        <button
          type="button"
          className={s.citationSummary}
          aria-expanded={isDetailsOpen}
          onClick={toggleDetails}
        >
          <span className={s.citationSummaryText}>
            <span className={s.citationsTitle}>Knowledge references ({citations.length})</span>
            <span className={s.citationSummaryMeta}>{sourceSummary}</span>
          </span>
          <span className={s.citationSummaryAction}>{isDetailsOpen ? 'Hide details' : 'View details'}</span>
        </button>

        {isDetailsOpen && (
          <div className={s.citationDetails}>
            {visibleCitations.map((c, idx) => {
              const name = c.document_name || c.dataset_name || `Source ${idx + 1}`
              const key = `${item.id}-${c.segment_id || c.document_id || idx}`
              const isExpanded = expandedCitation === key
              const content = c.content || ''
              const metaParts = [
                c.dataset_name,
                typeof c.segment_position === 'number' ? `chunk ${c.segment_position}` : undefined,
                typeof c.score === 'number' ? `${Math.round(c.score * 100)}% match` : undefined,
              ].filter(Boolean)
              return (
                <div className={s.citationItem} key={key}>
                  <div className={s.citationHeader}>
                    <div className={s.citationBadge}>#{idx + 1}</div>
                    <div className={s.citationHeading}>
                      <div className={s.citationName} title={name}>{name}</div>
                      {!!metaParts.length && <div className={s.citationMeta}>{metaParts.join(' / ')}</div>}
                    </div>
                  </div>
                  {!!content && (
                    <>
                      <div className={`${s.citationContent} ${isExpanded ? s.citationContentExpanded : ''}`}>
                        {content}
                      </div>
                      {content.length > 220 && (
                        <button
                          type="button"
                          className={s.citationToggle}
                          aria-expanded={isExpanded}
                          onClick={() => setExpandedCitation(isExpanded ? null : key)}
                        >
                          {isExpanded ? 'Show less' : 'Show referenced text'}
                        </button>
                      )}
                    </>
                  )}
                </div>
              )
            })}
            {citations.length > visibleCitations.length && (
              <div className={s.citationOverflow}>
                Showing first {visibleCitations.length} of {citations.length} references.
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={s.root}>
      <div className={s.topoBackground}>
        <div className={s.topoPattern} />
        <div className={s.leafParticle} />
        <div className={s.leafParticle} />
        <div className={s.leafParticle} />
        <div className={s.leafParticle} />
        <div className={s.leafParticle} />
      </div>

      <div className={s.content}>
        <div className={s.chatContainer}>
          {!hasMessages && (
            <section className={s.welcome}>
              <div className={s.welcomeLogo} aria-hidden="true">
                <span className={s.welcomeLogoLetter}>C</span>
              </div>
              <h1 className={s.welcomeTitle}>{title}</h1>
              <p className={s.welcomeSubtitle}>{subtitle}</p>

              <div className={s.suggestedPrompts}>
                {autoPrompts.map((p, idx) => {
                  const PromptIcon = promptIcons[idx] || RiFootprintLine
                  return (
                    <button
                      key={`${p.title}-${idx}`}
                      className={`${s.promptCard} ${isResponding ? s.promptCardDisabled : ''}`}
                      type="button"
                      aria-disabled={isResponding}
                      onClick={() => handlePromptSend(p.prompt)}
                    >
                      <div className={s.promptIcon}>
                        <PromptIcon size={20} aria-hidden="true" />
                      </div>
                      <div className={s.promptTitle}>{p.title}</div>
                      <div className={s.promptDesc}>{p.desc || p.prompt}</div>
                    </button>
                  )
                })}
              </div>

              <div className={s.featuresGrid}>
                {featureCards.map(({ title, desc, Icon }) => (
                  <div className={s.featureCard} key={title}>
                    <div className={s.featureIcon}>
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <div className={s.featureTitle}>{title}</div>
                    <div className={s.featureDesc}>{desc}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasMessages && (
            <div className={s.messagesArea} ref={messagesRef} onScroll={handleMessagesScroll}>
              {visibleChatList.map((item) => {
                const isUser = !isAnswerItem(item)
                return (
                  <div key={item.id} className={`${s.message} ${isUser ? s.messageUser : ''}`}>
                    <div className={`${s.avatar} ${isUser ? s.avatarUser : s.avatarAi}`} aria-hidden="true">
                      {isUser ? <div className={s.avatarDot} /> : <span className={s.avatarBrand}>C</span>}
                    </div>
                    <div className={s.messageContent}>
                      <div className={`${s.bubble} ${isUser ? s.bubbleUser : s.bubbleAi}`}>
                        {renderBubbleImages(item)}
                        <StreamdownMarkdown content={item.content || ''} />
                        {!isUser && renderCitations(item)}
                      </div>
                    </div>
                  </div>
                )
              })}

              {!!isResponding && (
                <div className={s.typing}>
                  <div className={`${s.avatar} ${s.avatarAi}`} aria-hidden="true">
                    <span className={s.avatarBrand}>C</span>
                  </div>
                  <div className={s.typingDots} aria-label="Typing">
                    <span className={s.typingDot} />
                    <span className={s.typingDot} />
                    <span className={s.typingDot} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={s.inputArea}>
          <div className={s.inputContainer}>
            <div className={s.inputCard}>
              <Textarea
                className={s.inputField}
                value={query}
                onChange={(e: any) => {
                  setQuery(e.target.value)
                  queryRef.current = e.target.value
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask your question... (Enter to send, Shift+Enter for a new line)"
                autoSize
              />
              <button className={s.sendBtn} onClick={handleSend} disabled={isResponding || !queryRef.current.trim()}>
                <RiSendPlane2Line size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {hasMessages && (
        <button
          type="button"
          className={`${s.scrollToBottom} ${showScrollButton ? s.scrollToBottomVisible : ''}`}
          aria-label="Scroll to bottom"
          onClick={scrollToBottom}
        >
          <RiArrowDownLine size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default React.memo(TerraMindChat)
