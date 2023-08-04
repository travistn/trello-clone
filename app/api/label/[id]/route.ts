import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import Task from '@/models/task';

export const PATCH = async (req: Request) => {
  const { label, task } = await req.json();

  try {
    await connectToDb();

    const existingTask = await Task.findById(task._id);

    await existingTask.labels.push(label._id);

    await existingTask.save();

    return NextResponse.json('Successfully updated the label', { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to update the task.', {
      status: 500,
    });
  }
};
