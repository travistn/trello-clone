import { connectToDb } from '@/utils/database';
import Task from '@/models/task';

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { description } = await req.json();

  try {
    await connectToDb();

    const existingTask = await Task.findById(params.id);

    existingTask.description = description;

    await existingTask.save();

    return new Response('Successfully updated the task', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Failed to update the task.'), {
      status: 500,
    });
  }
};