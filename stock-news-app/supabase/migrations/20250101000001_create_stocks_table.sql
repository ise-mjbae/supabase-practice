-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker VARCHAR(10) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sector TEXT,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on ticker for fast lookups
CREATE INDEX IF NOT EXISTS idx_stocks_ticker ON stocks(ticker);

-- Add comment
COMMENT ON TABLE stocks IS 'Stores stock/ticker information';
