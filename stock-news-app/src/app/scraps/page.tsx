'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface Scrap {
  id: string
  content_type: string
  content_id: string
  notes: string | null
  created_at: string
}

export default function ScrapsPage() {
  const [scraps, setScraps] = useState<Scrap[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const fetchScraps = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_scraps')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setScraps(data || [])
    } catch (error) {
      console.error('Error fetching scraps:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)
      await fetchScraps(user.id)
    }

    checkUser()
  }, [router, supabase, fetchScraps])

  async function deleteScrap(scrapId: string) {
    try {
      const { error } = await supabase.from('user_scraps').delete().eq('id', scrapId)

      if (error) throw error

      setScraps(scraps.filter((s) => s.id !== scrapId))
    } catch (error) {
      console.error('Error deleting scrap:', error)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white cursor-pointer">
                🔖 My Scraps
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email}
              </span>
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
              >
                Dashboard
              </Link>
              <Link
                href="/news"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
              >
                News
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {scraps.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No scraps yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start saving your favorite news articles and market data
            </p>
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Browse News
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {scraps.map((scrap) => (
              <div
                key={scrap.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {scrap.content_type}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(scrap.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Content ID: {scrap.content_id}
                    </p>
                    {scrap.notes && (
                      <p className="text-gray-900 dark:text-white">{scrap.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteScrap(scrap.id)}
                    className="ml-4 px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
