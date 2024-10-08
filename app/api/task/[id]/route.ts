import { NextRequest, NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import Task from '@/models/task';

export const POST = async (req: NextRequest) => {
  const { taskId } = await req.json();

  try {
    await connectToDb();

    const task = await Task.findById(taskId);

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(JSON.stringify('Failed to retrieve the task.'), {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { description, task, dueDate, isDue, action } = await req.json();

  try {
    await connectToDb();

    const existingTask = await Task.findById(params.id);

    if (action === 'updateTaskDescription') existingTask.description = description;

    if (action === 'updateTaskOrder') {
      existingTask.order = task.order;
    }

    if (action === 'addDueDate') {
      existingTask.dueDate = dueDate;
      existingTask.isDue = true;
    }

    if (action === 'updateTaskDue') {
      existingTask.isDue = isDue;
    }

    if (action === 'deleteDueDate') {
      existingTask.dueDate = undefined;
      existingTask.isDue = undefined;
    }

    await existingTask.save();

    return NextResponse.json('Successfully updated the task', { status: 200 });
  } catch (error) {
    return NextResponse.json(JSON.stringify('Failed to update the task.'), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();

    await Task.findByIdAndDelete(params.id);

    return NextResponse.json('Task deleted successfully', { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to delete task.', { status: 500 });
  }
};
