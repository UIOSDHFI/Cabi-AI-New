import type { ChatItem } from '@/types/app'

const STORAGE_KEY = 'webappConversation:chatCache:v1'
const MAX_CONVERSATIONS = 20
const MAX_ITEMS_PER_CONVERSATION = 120

type CacheRecord = Record<string, {
  updatedAt: number
  chatList: ChatItem[]
}>

function safeParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  }
  catch {
    return null
  }
}

function getStorage(): Storage | null {
  try {
    return globalThis.localStorage ?? null
  }
  catch {
    return null
  }
}

function getKey(appId: string) {
  return `${STORAGE_KEY}:${appId}`
}

export function getCachedChatList(appId: string, conversationId: string): ChatItem[] | null {
  if (!appId || !conversationId || conversationId === '-1') return null
  const storage = getStorage()
  if (!storage) return null
  const raw = storage.getItem(getKey(appId))
  const record = safeParse<CacheRecord>(raw) || {}
  return record[conversationId]?.chatList || null
}

export function setCachedChatList(appId: string, conversationId: string, chatList: ChatItem[]) {
  if (!appId || !conversationId || conversationId === '-1') return
  const storage = getStorage()
  if (!storage) return

  const raw = storage.getItem(getKey(appId))
  const record = safeParse<CacheRecord>(raw) || {}

  record[conversationId] = {
    updatedAt: Date.now(),
    chatList: chatList.slice(-MAX_ITEMS_PER_CONVERSATION),
  }

  const entries = Object.entries(record)
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
    .slice(0, MAX_CONVERSATIONS)

  const trimmed = Object.fromEntries(entries) as CacheRecord
  storage.setItem(getKey(appId), JSON.stringify(trimmed))
}

