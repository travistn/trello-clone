import { connectToDb } from '@/utils/database';
import List from '@/models/list';

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();

    await List.findByIdAndDelete(params.id);

    return new Response('List deleted successfully', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Failed to delete list.'), {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { title } = await req.json();

  try {
    await connectToDb();

    const existingList = await List.findById(params.id);

    existingList.title = title;

    await existingList.save();

    return new Response('Successfully updated the title', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Failed to update the title.'), {
      status: 500,
    });
  }
};
