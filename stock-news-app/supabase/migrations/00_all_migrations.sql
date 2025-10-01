-- ============================================
-- ALL MIGRATIONS COMBINED
-- Run this in Supabase SQL Editor
-- ============================================

-- Migration 1: Create stocks table
-- ============================================
CREATE TABLE IF NOT EXISTS stocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker VARCHAR(10) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sector TEXT,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stocks_ticker ON stocks(ticker);
COMMENT ON TABLE stocks IS 'Stores stock/ticker information';

-- Migration 2: Create news table
-- ============================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  source TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  tickers TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_tickers ON news USING GIN(tickers);
COMMENT ON TABLE news IS 'Stores news articles related to stocks and markets';

-- Migration 3: Create market_indicators table
-- ============================================
CREATE TABLE IF NOT EXISTS market_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_type VARCHAR(50) NOT NULL,
  value DECIMAL(20, 4) NOT NULL,
  change_value DECIMAL(20, 4),
  change_percent DECIMAL(10, 4),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_market_indicators_type_date
ON market_indicators(indicator_type, recorded_at DESC);
COMMENT ON TABLE market_indicators IS 'Stores market indicator data (indices, VIX, etc.)';

-- Migration 4: Create user_scraps table
-- ============================================
CREATE TABLE IF NOT EXISTS user_scraps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type VARCHAR(20) NOT NULL,
  content_id UUID NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_scraps_user_content
ON user_scraps(user_id, content_type, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_scraps_unique
ON user_scraps(user_id, content_type, content_id);
COMMENT ON TABLE user_scraps IS 'Stores user bookmarks/scraps for news, stocks, and indicators';

-- Migration 5: Enable RLS and create policies
-- ============================================
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scraps ENABLE ROW LEVEL SECURITY;

-- Stocks: Public read access
CREATE POLICY "Anyone can view stocks"
ON stocks FOR SELECT
TO public
USING (true);

-- News: Public read access
CREATE POLICY "Anyone can view news"
ON news FOR SELECT
TO public
USING (true);

-- Market Indicators: Public read access
CREATE POLICY "Anyone can view market indicators"
ON market_indicators FOR SELECT
TO public
USING (true);

-- User Scraps: Users can only view their own scraps
CREATE POLICY "Users can view their own scraps"
ON user_scraps FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- User Scraps: Users can insert their own scraps
CREATE POLICY "Users can insert their own scraps"
ON user_scraps FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- User Scraps: Users can update their own scraps
CREATE POLICY "Users can update their own scraps"
ON user_scraps FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User Scraps: Users can delete their own scraps
CREATE POLICY "Users can delete their own scraps"
ON user_scraps FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- MIGRATIONS COMPLETE
-- ============================================
