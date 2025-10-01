-- Enable Row Level Security (RLS) on all tables
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
