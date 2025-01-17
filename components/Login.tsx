'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { signIn, signOut, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

import googleIcon from '../public/google-icon.svg';
import trelloIcon from '../public/trello-icon.svg';

const Login = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <div className='flex flex-col items-center gap-6 px-[32px] py-[40px] bg-white rounded-[3px] shadow-md'>
      <div className='flex flex-row items-center gap-2'>
        <Image src={trelloIcon} alt='trello-icon' width={24} height={24} className='mt-1' />
        <h1 className='text-[34px] font-bold text-navy'>Trello Clone</h1>
      </div>
      <p className='text-navy font-semibold'>Log in to continue</p>
      {providers &&
        Object.values(providers).map((provider) => (
          <div className='flex flex-col gap-4'>
            <button
              className='border border-[#c1c7d0] rounded-[3px] px-[7rem] py-2 hover:bg-gray-50'
              onClick={() => signIn(provider.id)}>
              <span className='text-[15px] font-bold flex flex-row items-center gap-3 text-navy'>
                <Image src={googleIcon} alt='google-icon' width={24} height={24} />
                Google
              </span>
            </button>
            <button className='border border-[#c1c7d0] rounded-[3px] px-[7rem] py-2 hover:bg-gray-50'>
              <span className='text-[15px] font-bold flex flex-row items-center gap-3 text-navy'>
                <FaUser className='text-[22px] text-black' />
                Guest Login
              </span>
            </button>
          </div>
        ))}
    </div>
  );
};

export default Login;
