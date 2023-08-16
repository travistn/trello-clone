import { NextResponse } from 'next/server';

import { connectToDb } from '@/utils/database';
import List from '@/models/list';
import Task from '@/models/task';

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();

    await List.findByIdAndDelete(params.id);

    await Task.deleteMany({ list: params.id });

    return NextResponse.json('List deleted successfully', { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to delete list.', { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { list, title, action } = await req.json();

  try {
    await connectToDb();

    const existingList = await List.findById(params.id);

    if (action === 'updateTitle') existingList.title = title;

    if (action === 'updateOrder') {
      existingList.order = list.order;
    }

    await existingList.save();

    return NextResponse.json('Successfully updated the title', { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to update the title.'), { status: 500 };
  }
};
