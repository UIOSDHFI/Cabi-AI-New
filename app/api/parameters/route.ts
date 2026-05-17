import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  try {
    const { data } = await client.getApplicationParameters(user)
    return NextResponse.json(data as object, {
      headers: setSession(sessionId),
    })
  }
  catch (error) {
    const e = error as any
    const status = typeof e?.status === 'number' ? e.status : 500
    const message = e?.message || 'Failed to fetch application parameters'
    return NextResponse.json({
      error: message,
      status,
      hint: status === 401
        ? 'Dify returned 401. Check that NEXT_PUBLIC_API_URL matches your Dify instance and that NEXT_PUBLIC_APP_KEY is this app\'s API key from the API Access page. Restart the dev server after changing .env.local.'
        : undefined,
    }, {
      status,
      headers: setSession(sessionId),
    })
  }
}
