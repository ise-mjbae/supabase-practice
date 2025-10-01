# 📈 Stock Market Dashboard

A modern stock market dashboard built with Next.js, Supabase, and Tailwind CSS. Track real-time market indicators, browse stock news, and save your favorite content.

## ✨ Features

- **📊 Real-time Market Indicators**: Track S&P 500, NASDAQ, Dow Jones, and VIX
- **📰 Stock News Feed**: Browse latest news articles filtered by stock ticker
- **🔖 Bookmark & Scrap**: Save your favorite news and market data
- **🔐 User Authentication**: Secure login with Supabase Auth
- **🎨 Modern UI**: Beautiful dark mode support with Tailwind CSS
- **⚡ Fast Performance**: Built on Next.js 15 with App Router

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- API keys for stock data (Finnhub recommended)

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd stock-news-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Copy `.env.local` and fill in your credentials:

   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

   # Finnhub API (Get free key at https://finnhub.io/register)
   FINNHUB_API_KEY=your_finnhub_key_here
   ```

4. **Apply database migrations**:

   Go to your Supabase project dashboard → SQL Editor, then run each migration file in order:
   - `supabase/migrations/20250101000001_create_stocks_table.sql`
   - `supabase/migrations/20250101000002_create_news_table.sql`
   - `supabase/migrations/20250101000003_create_market_indicators_table.sql`
   - `supabase/migrations/20250101000004_create_user_scraps_table.sql`
   - `supabase/migrations/20250101000005_enable_rls.sql`

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Tables

- **stocks**: Store stock/ticker information
- **news**: Store news articles with related tickers
- **market_indicators**: Store market index data (S&P 500, NASDAQ, etc.)
- **user_scraps**: Store user bookmarks with RLS policies

### Security

Row Level Security (RLS) is enabled on all tables:
- Public read access for stocks, news, and market indicators
- User-specific read/write access for scraps (authenticated users only)

## 🔑 API Keys

### Finnhub (Recommended)
- Free tier: 60 API calls/minute
- Sign up: https://finnhub.io/register
- Provides: Stock quotes, company profiles, news

### Alternative APIs
- **Alpha Vantage**: https://www.alphavantage.co/support/#api-key
- **Polygon.io**: https://polygon.io/dashboard/signup
- **NewsAPI**: https://newsapi.org/register

## 📁 Project Structure

```
stock-news-app/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── news/         # News API endpoint
│   │   │   ├── market-indicators/  # Market data endpoint
│   │   │   └── stock/        # Stock quote endpoint
│   │   ├── auth/             # Authentication page
│   │   ├── news/             # News feed page
│   │   ├── scraps/           # User scraps page
│   │   └── page.tsx          # Dashboard home
│   ├── components/
│   │   └── MarketIndicators.tsx  # Market indicators component
│   ├── lib/
│   │   └── supabase/         # Supabase client setup
│   └── types/
│       └── database.types.ts # TypeScript types
├── supabase/
│   └── migrations/           # Database migrations
└── .env.local                # Environment variables
```

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Finnhub Stock API
- **Deployment**: Vercel (recommended)

## 📝 Usage

### Dashboard
- View real-time market indicators
- Quick access to popular stock news (AAPL, TSLA, GOOGL)

### News Feed
- Search news by stock ticker
- View latest articles with images and descriptions
- Click to read full articles on source websites

### Scraps
- Sign in to save your favorite content
- View all your saved scraps
- Add notes to your bookmarks
- Delete scraps when no longer needed

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Support

For issues or questions, please open an issue on GitHub.
