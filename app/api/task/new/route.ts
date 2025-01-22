import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import Task from '@/models/task';
import List from '@/models/list';

export const POST = async (req: Request) => {
  const { userId, description, list, order } = await req.json();

  try {
    await connectToDb();
    const newTask = await new Task({ userId, description, list, order }).save();

    const existingList = await List.findById(list);

    existingList.tasks.push(newTask._id);

    await existingList.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Failed to create a new task.', { status: 500 });
  }
};
