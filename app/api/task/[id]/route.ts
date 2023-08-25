import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import Task from '@/models/task';
import List from '@/models/list';

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { description, list, category, task, tasks, action, id } = await req.json();

  try {
    await connectToDb();

    const existingTask = await Task.findById(params.id);

    if (category === 'description') existingTask.description = description;

    if (category === 'list') {
      existingTask.list = list._id;

      const removeTaskFromList = await List.findOneAndUpdate(
        { _id: task.list },
        {
          $pull: {
            tasks: task._id,
          },
        },
        { safe: true }
      );

      const existingList = await List.findById(list._id);

      existingList.tasks = tasks;

      await existingList.save();
      await removeTaskFromList.save();
    }

    if (category === 'position') {
      const existingList = await List.findById(list._id);

      existingList.tasks = tasks;

      await existingList.save();
    }

    if (action === 'updateTaskOrder') {
      existingTask.order = task.order;
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
