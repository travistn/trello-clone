import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import Task from '@/models/task';
import Label from '@/models/label';

export const PATCH = async (req: Request) => {
  const { label, task, title, action } = await req.json();

  try {
    await connectToDb();

    const existingTask = await Task.findById(task?._id);
    const existingLabel = await Label.findById(label?._id);

    if (action === 'addLabel') {
      await existingTask.labels.push(label._id);
    }

    if (action === 'removeLabel') {
      await existingTask.labels.splice(existingTask.labels.indexOf(label._id), 1);
    }

    if (action === 'editLabel') {
      existingLabel.title = title;
    }

    await existingTask?.save();
    await existingLabel?.save();

    return NextResponse.json('Successfully updated the label', { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to update the task.', {
      status: 500,
    });
  }
};
