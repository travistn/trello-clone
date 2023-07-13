import { revalidatePath } from 'next/cache';

import { connectToDb } from '@/utils/database';
import List from '@/models/list';

export const GET = async () => {
  try {
    await connectToDb();

    const lists = await List.find({});

    revalidatePath('/api/list');

    return new Response(JSON.stringify(lists), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify('Failed to fetch all lists'), {
      status: 500,
    });
  }
};
