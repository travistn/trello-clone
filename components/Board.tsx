'use client';

import { FormEvent, useState, useEffect } from 'react';

import ListCard from './ListCard';
import CustomButton from './CustomButton';
import Form from './Form';
import { ListProps } from '@/types';

const Board = () => {
  const [toggleAddCard, setToggleAddCard] = useState(false);
  const [list, setList] = useState({ title: '' });
  const [lists, setLists] = useState([] as ListProps[]);

  const createList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/list/new', {
        method: 'POST',
        body: JSON.stringify({
          title: list.title,
        }),
      });

      if (response.ok) {
        console.log('New list successfully created.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch('/api/list');
      const data = await response.json();

      setLists(data);
    };

    fetchLists();
  }, []);

  return (
    <div className='w-full p-8 flex flex-row gap-4 max-sm:flex-col max-sm:items-center'>
      {lists?.map((list) => (
        <ListCard title={list?.title} key={list?._id} />
      ))}
      <div
        className={`w-[272px] h-max rounded-[12px] px-4 py-3 ${
          !toggleAddCard
            ? 'bg-[#68758b] cursor-pointer transition-colors duration-100 ease-in hover:bg-[#A6C5E229] '
            : 'bg-white'
        }`}>
        {!toggleAddCard ? (
          <CustomButton
            title='Add another list'
            containerStyles='w-full'
            textStyles='text-white text-[14px]'
            btnType='button'
            plusIcon={true}
            handleClick={() => setToggleAddCard((prevState) => !prevState)}
          />
        ) : (
          <Form
            placeholder='Enter list title...'
            btnTitle='Add list'
            handleCloseClick={() => setToggleAddCard((prevState) => !prevState)}
            list={list}
            setList={setList}
            handleSubmit={createList}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
