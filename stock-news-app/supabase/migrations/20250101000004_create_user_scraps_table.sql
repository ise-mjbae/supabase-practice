-- Create user_scraps table
CREATE TABLE IF NOT EXISTS user_scraps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type VARCHAR(20) NOT NULL, -- 'news', 'stock', 'indicator'
  content_id UUID NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create composite index for user queries
CREATE INDEX IF NOT EXISTS idx_user_scraps_user_content
ON user_scraps(user_id, content_type, created_at DESC);

-- Create unique constraint to prevent duplicate scraps
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_scraps_unique
ON user_scraps(user_id, content_type, content_id);

-- Add comment
COMMENT ON TABLE user_scraps IS 'Stores user bookmarks/scraps for news, stocks, and indicators';
