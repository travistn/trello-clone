'use client';

import { useSession } from 'next-auth/react';

import Login from '@/components/Login';
import Board from '@/components/Board';
import Navbar from '@/components/Navbar';
import { useUserStore } from '@/store/store';
import { UserProps } from '@/types';

const Home = () => {
  const { data: session } = useSession();

  const setUser = useUserStore((state) => state.setUser);

  setUser(session?.user as UserProps);

  return (
    <main
      className={`max-sm:w-full max-sm:min-h-screen md:h-screen md:w-screen max-sm:overflow-auto ${
        session?.user ? 'gradient' : 'bg-[#fafbfc] flex justify-center items-center'
      }`}>
      {session?.user ? (
        <div>
          <Navbar />
          <Board />
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
};

export default Home;
