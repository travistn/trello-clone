import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import Label from '@/models/label';

export const revalidate = 0;

export const GET = async () => {
  try {
    await connectToDb();

    const labels = await Label.find({});

    return NextResponse.json(labels, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch all labels', { status: 500 });
  }
};
