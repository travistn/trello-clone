import { connectToDb } from '@/utils/database';
import List from '@/models/list';

export const POST = async (req: Request) => {
  const { userId, title, order } = await req.json();

  try {
    await connectToDb();
    const newList = new List({ userId, title, order });

    await newList.save();

    return new Response(JSON.stringify(newList), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to create a new list.', { status: 500 });
  }
};
