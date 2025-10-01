-- Create market_indicators table
CREATE TABLE IF NOT EXISTS market_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_type VARCHAR(50) NOT NULL, -- 'SP500', 'NASDAQ', 'DOW', 'VIX', etc.
  value DECIMAL(20, 4) NOT NULL,
  change_value DECIMAL(20, 4),
  change_percent DECIMAL(10, 4),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create composite index for efficient queries
CREATE INDEX IF NOT EXISTS idx_market_indicators_type_date
ON market_indicators(indicator_type, recorded_at DESC);

-- Add comment
COMMENT ON TABLE market_indicators IS 'Stores market indicator data (indices, VIX, etc.)';
