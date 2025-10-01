export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stocks: {
        Row: {
          id: string
          ticker: string
          name: string
          sector: string | null
          industry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticker: string
          name: string
          sector?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticker?: string
          name?: string
          sector?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          description: string | null
          url: string
          source: string | null
          author: string | null
          published_at: string
          image_url: string | null
          tickers: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          url: string
          source?: string | null
          author?: string | null
          published_at: string
          image_url?: string | null
          tickers?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          url?: string
          source?: string | null
          author?: string | null
          published_at?: string
          image_url?: string | null
          tickers?: string[] | null
          created_at?: string
        }
      }
      market_indicators: {
        Row: {
          id: string
          indicator_type: string
          value: number
          change_value: number | null
          change_percent: number | null
          recorded_at: string
          created_at: string
        }
        Insert: {
          id?: string
          indicator_type: string
          value: number
          change_value?: number | null
          change_percent?: number | null
          recorded_at: string
          created_at?: string
        }
        Update: {
          id?: string
          indicator_type?: string
          value?: number
          change_value?: number | null
          change_percent?: number | null
          recorded_at?: string
          created_at?: string
        }
      }
      user_scraps: {
        Row: {
          id: string
          user_id: string
          content_type: string
          content_id: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_type: string
          content_id: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_type?: string
          content_id?: string
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}
