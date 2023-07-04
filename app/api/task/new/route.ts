import { connectToDb } from '@/utils/database';
import Task from '@/models/task';
import List from '@/models/list';

export const POST = async (req: Request) => {
  const { description, list } = await req.json();

  try {
    await connectToDb();
    const newTask = new Task({ description, list });

    await newTask.save();

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to create a new task.', { status: 500 });
  }
};
