import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import Task from '@/models/task';

export const revalidate = 0;

export const GET = async (req: Request) => {
  try {
    await connectToDb();

    const tasks = await Task.find();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch all tasks', { status: 500 });
  }
};
