'use client'

import type { FC } from 'react'
import React, { useMemo, useState } from 'react'
import {
  RiChat3Line,
  RiCompassLine,
  RiFootprintLine,
  RiHome5Line,
  RiLeafLine,
  RiMenuLine,
  RiSettings3Line,
  RiTentLine,
  RiUser3Line,
} from '@remixicon/react'
import type { ConversationItem } from '@/types/app'
import s from './style.module.css'

export interface TerraMindShellProps {
  appTitle: string
  conversations: ConversationItem[]
  currentConversationId: string
  onSelectConversation: (id: string) => void
  onCreateNewChat: () => void
  children: React.ReactNode
}

const TerraMindShell: FC<TerraMindShellProps> = ({
  appTitle,
  conversations,
  currentConversationId,
  onSelectConversation,
  onCreateNewChat,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const displayConversations = useMemo(() => {
    return conversations.slice(0, 20)
  }, [conversations])

  const handleCreateNewChat = () => {
    onCreateNewChat()
    setMobileOpen(false)
  }

  const handleSelectConversation = (id: string) => {
    onSelectConversation(id)
    setMobileOpen(false)
  }

  const menuItems = [
    { label: 'Home', Icon: RiHome5Line, active: true, onClick: handleCreateNewChat },
    { label: 'Explore', Icon: RiCompassLine, comingSoon: true },
    { label: 'Trails', Icon: RiFootprintLine, comingSoon: true },
    { label: 'Cabins', Icon: RiTentLine, comingSoon: true },
    { label: 'Eco Guide', Icon: RiLeafLine, comingSoon: true },
  ]

  return (
    <div className={s.root}>
      <div className={s.app}>
        <div className={s.mobileBar}>
          <button className={s.mobileMenuBtn} type="button" onClick={() => setMobileOpen(true)} aria-label="Open sidebar">
            <RiMenuLine size={20} aria-hidden="true" />
          </button>
          <span className={s.mobileTitle}>{appTitle}</span>
        </div>
        {mobileOpen && <button className={s.backdrop} type="button" aria-label="Close sidebar" onClick={() => setMobileOpen(false)} />}

        <aside className={`${s.sidebar} ${collapsed ? s.sidebarCollapsed : ''} ${mobileOpen ? s.sidebarMobileOpen : ''}`} aria-label="Sidebar">
          <div className={s.sidebarHeader}>
            <div className={s.logo}>
              <div className={s.logoIcon} aria-hidden="true">
                <span className={s.logoLetter}>C</span>
              </div>
              <span className={s.logoText}>{appTitle}</span>
            </div>
            <button className={s.toggleBtn} onClick={() => setCollapsed(v => !v)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              <RiMenuLine size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className={s.nav}>
            <div className={s.navSection}>
              <div className={s.sectionTitle}>Menu</div>
              {menuItems.map(({ label, Icon, active, onClick, comingSoon }) => (
                <button
                  key={label}
                  type="button"
                  className={`${s.navItem} ${active ? s.navItemActive : ''} ${comingSoon ? s.navItemDisabled : ''}`}
                  aria-disabled={comingSoon || undefined}
                  title={comingSoon ? `${label} - In development` : label}
                  onClick={onClick}
                >
                  <Icon size={22} aria-hidden="true" />
                  <span className={s.navLabel}>{label}</span>
                  {comingSoon && <span className={s.soonBadge}>In development</span>}
                  <span className={s.navTooltip}>{comingSoon ? `${label} - In development` : label}</span>
                </button>
              ))}
            </div>

            <div className={s.navSection}>
              <div className={s.sectionTitle}>Recent</div>
              {displayConversations.map((c) => {
                const active = c.id === currentConversationId
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`${s.navItem} ${active ? s.navItemActive : ''}`}
                    onClick={() => handleSelectConversation(c.id)}
                    title={c.name}
                  >
                    <RiChat3Line size={22} aria-hidden="true" />
                    <span className={s.navLabel}>{c.name}</span>
                    <span className={s.navTooltip}>{c.name}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          <div className={s.footer}>
            <button
              type="button"
              className={`${s.navItem} ${s.navItemDisabled}`}
              aria-disabled="true"
              title="Settings - In development"
            >
              <RiSettings3Line size={22} aria-hidden="true" />
              <span className={s.navLabel}>Settings</span>
              <span className={s.soonBadge}>In development</span>
              <span className={s.navTooltip}>Settings - In development</span>
            </button>
            <div className={s.userCard}>
              <div className={s.userAvatar}>
                <RiUser3Line size={18} aria-hidden="true" />
              </div>
              <div className={s.userInfo}>
                <div className={s.userName}>Cabin Guest</div>
                <div className={s.userStatus}>
                  <span className={s.statusDot} />
                  Online
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className={`${s.main} ${collapsed ? s.mainCollapsed : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default React.memo(TerraMindShell)
