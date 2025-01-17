'use client';

import { useSession } from 'next-auth/react';

import Login from '@/components/Login';
import Board from '@/components/Board';

const Home = () => {
  const { data: session } = useSession();

  return (
    <main className='max-sm:w-full max-sm:min-h-screen md:h-screen md:w-screen max-sm:overflow-auto flex justify-center items-center bg-[#fafbfc]'>
      {session?.user ? <Board /> : <Login />}
    </main>
  );
};

export default Home;
