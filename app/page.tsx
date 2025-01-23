'use client';

import { useSession } from 'next-auth/react';

import Login from '@/components/Login';
import { useUserStore } from '@/store/store';
import { UserProps } from '@/types';
import { redirect } from 'next/navigation';

const Home = () => {
  const { data: session } = useSession();

  const setUser = useUserStore((state) => state.setUser);

  setUser(session?.user as UserProps);

  if (session) {
    return redirect(`/board/${session?.user?.id}`);
  }

  return (
    <main className='max-sm:w-full max-sm:min-h-screen md:h-screen md:w-screen max-sm:overflow-auto bg-[#fafbfc] flex justify-center items-center'>
      <Login />
    </main>
  );
};

export default Home;
