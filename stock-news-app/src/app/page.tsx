import MarketIndicators from '@/components/MarketIndicators'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              📈 Stock Market Dashboard
            </h1>
            <nav className="flex gap-4">
              <Link
                href="/news"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
              >
                News
              </Link>
              <Link
                href="/scraps"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
              >
                My Scraps
              </Link>
              <Link
                href="/auth"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Indicators Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Market Overview
          </h2>
          <MarketIndicators />
        </section>

        {/* Quick Access Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/news?ticker=AAPL"
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6 block"
            >
              <div className="text-4xl mb-4">🍎</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Apple (AAPL)
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Latest news and updates
              </p>
            </Link>

            <Link
              href="/news?ticker=TSLA"
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6 block"
            >
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Tesla (TSLA)
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Latest news and updates
              </p>
            </Link>

            <Link
              href="/news?ticker=GOOGL"
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6 block"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Google (GOOGL)
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Latest news and updates
              </p>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                📰 Real-time News
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get the latest stock market news from various sources, filtered by ticker or keyword.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                📊 Market Indicators
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track major market indices like S&P 500, NASDAQ, Dow Jones, and VIX in real-time.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🔖 Bookmark & Scrap
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Save your favorite news articles and market data for later reference.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🔍 Search & Filter
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily search and filter news by company ticker, date, or keywords.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Stock Market Dashboard - Built with Next.js & Supabase
          </p>
        </div>
      </footer>
    </div>
  )
}
