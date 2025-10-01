import { NextResponse } from 'next/server'

// Alpha Vantage API for market indices
export async function GET() {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Fetch major indices using Alpha Vantage
    const indices = [
      { symbol: 'SPY', name: 'GSPC', displayName: 'S&P 500' }, // S&P 500 ETF
      { symbol: 'QQQ', name: 'IXIC', displayName: 'NASDAQ' }, // NASDAQ ETF
      { symbol: 'DIA', name: 'DJI', displayName: 'Dow Jones' }, // Dow Jones ETF
      { symbol: 'VIX', name: 'VIX', displayName: 'VIX' }, // VIX
    ]

    const promises = indices.map(async (index) => {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${index.symbol}&apikey=${apiKey}`
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 1 minute
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch ${index.symbol}`)
      }

      const data = await response.json()
      const quote = data['Global Quote']

      if (!quote || !quote['05. price']) {
        console.error(`Invalid response for ${index.symbol}:`, data)
        return {
          indicator_type: index.name,
          value: 0,
          change_value: 0,
          change_percent: 0,
          recorded_at: new Date().toISOString(),
        }
      }

      return {
        indicator_type: index.name,
        value: parseFloat(quote['05. price']),
        change_value: parseFloat(quote['09. change']),
        change_percent: parseFloat(quote['10. change percent'].replace('%', '')),
        recorded_at: new Date().toISOString(),
      }
    })

    const indicators = await Promise.all(promises)

    return NextResponse.json(indicators)
  } catch (error) {
    console.error('Error fetching market indicators:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market indicators' },
      { status: 500 }
    )
  }
}
