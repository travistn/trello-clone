import { connectToDb } from '@/utils/database';
import Task from '@/models/task';

export const GET = async (req: Request) => {
  try {
    await connectToDb();

    const tasks = await Task.find();

    return new Response(JSON.stringify(tasks), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify('Failed to fetch task.'), {
      status: 500,
    });
  }
};
