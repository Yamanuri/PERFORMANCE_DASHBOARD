import { NextResponse } from 'next/server';
import { generateInitialDataset, generateNewDataPoint } from '@/lib/dataGenerator';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = searchParams.get('count');
  const type = searchParams.get('type');

  try {
    if (type === 'initial') {
      const dataCount = count ? parseInt(count, 10) : 1000;
      const data = generateInitialDataset(dataCount);
      return NextResponse.json({ data });
    }

    if (type === 'new') {
      const data = generateNewDataPoint();
      return NextResponse.json({ data });
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate data' },
      { status: 500 }
    );
  }
}

