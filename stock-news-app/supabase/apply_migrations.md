# Apply Migrations to Supabase

To apply these migrations to your Supabase project, follow these steps:

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/eyznacaqcqhirysebrui
2. Navigate to **SQL Editor**
3. Copy and paste each migration file content in order:
   - `20250101000001_create_stocks_table.sql`
   - `20250101000002_create_news_table.sql`
   - `20250101000003_create_market_indicators_table.sql`
   - `20250101000004_create_user_scraps_table.sql`
   - `20250101000005_enable_rls.sql`
4. Click **Run** for each migration

## Option 2: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref eyznacaqcqhirysebrui

# Push migrations
supabase db push
```

## Verify Tables

After running migrations, verify tables were created:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```
