import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const TAVILY_API_URL = 'https://api.tavily.com/search';

export async function POST(req: NextRequest) {
  if (!TAVILY_API_KEY) {
    return NextResponse.json(
      { error: 'Tavily API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { query, searchDepth = 'basic', maxResults = 5, includeAnswer = false, includeImages = false, includeRawContent = false } = body ?? {};

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'query is required and must be a string' },
        { status: 400 }
      );
    }

    const response = await fetch(TAVILY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query,
        search_depth: searchDepth,
        max_results: maxResults,
        include_answer: includeAnswer,
        include_images: includeImages,
        include_raw_content: includeRawContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Tavily API error:', errorData);
      return NextResponse.json(
        { error: 'Tavily API request failed', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Tavily API route error:', error);
    return NextResponse.json(
      { error: 'Failed to process Tavily search request' },
      { status: 500 }
    );
  }
}


