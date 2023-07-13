import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import List from '@/models/list';

export const GET = async () => {
  try {
    await connectToDb();

    const lists = await List.find({});

    return NextResponse.json(lists, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch all lists', { status: 500 });
  }
};
