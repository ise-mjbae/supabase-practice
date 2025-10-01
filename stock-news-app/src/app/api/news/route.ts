import { NextRequest, NextResponse } from 'next/server'

// Finnhub API for stock news
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ticker = searchParams.get('ticker') || 'AAPL'
  const apiKey = process.env.FINNHUB_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - 7) // Last 7 days
    const toDate = new Date()

    const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}&token=${apiKey}`

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }

    const data = await response.json()

    // Transform Finnhub data to our format
    const news = (data as Array<{
      headline: string
      summary: string
      url: string
      source: string
      datetime: number
      image: string
    }>).map((item) => ({
      title: item.headline,
      description: item.summary,
      url: item.url,
      source: item.source,
      author: null,
      published_at: new Date(item.datetime * 1000).toISOString(),
      image_url: item.image,
      tickers: [ticker],
    }))

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
