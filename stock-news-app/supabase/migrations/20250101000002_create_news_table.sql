-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  source TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  tickers TEXT[], -- Array of related stock tickers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_tickers ON news USING GIN(tickers);

-- Add comment
COMMENT ON TABLE news IS 'Stores news articles related to stocks and markets';
