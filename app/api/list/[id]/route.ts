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
