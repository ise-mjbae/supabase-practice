import { NextRequest, NextResponse } from 'next/server'

type Params = {
  ticker: string
}

// Get stock quote and profile
export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  const { ticker } = await context.params
  const apiKey = process.env.FINNHUB_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Fetch quote and profile in parallel
    const [quoteRes, profileRes] = await Promise.all([
      fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`, {
        next: { revalidate: 60 },
      }),
      fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`, {
        next: { revalidate: 3600 },
      }),
    ])

    if (!quoteRes.ok || !profileRes.ok) {
      throw new Error('Failed to fetch stock data')
    }

    const quote = await quoteRes.json()
    const profile = await profileRes.json()

    return NextResponse.json({
      ticker,
      name: profile.name,
      sector: profile.finnhubIndustry,
      industry: profile.finnhubIndustry,
      price: quote.c,
      change: quote.d,
      changePercent: quote.dp,
      high: quote.h,
      low: quote.l,
      open: quote.o,
      previousClose: quote.pc,
      logo: profile.logo,
      marketCap: profile.marketCapitalization,
      country: profile.country,
      currency: profile.currency,
      exchange: profile.exchange,
      ipo: profile.ipo,
      weburl: profile.weburl,
    })
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}
