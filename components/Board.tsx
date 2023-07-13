'use client';

import { useState, useEffect, FormEvent } from 'react';

import ListCard from './ListCard';
import CustomButton from './CustomButton';
import Form from './Form';
import { ListProps } from '@/types';

const Board = () => {
  const [list, setList] = useState({ title: '' });
  const [lists, setLists] = useState([] as ListProps[]);

  const [toggleAddCard, setToggleAddCard] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      await fetch('/api/list/new', {
        method: 'POST',
        body: JSON.stringify({
          title: list.title,
        }),
        next: { revalidate: 1 },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitted(false);
      setToggleAddCard(false);
      setList({ title: '' });
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch('/api/list', { next: { revalidate: 1 } });
      const data = await response.json();

      setLists(data);
    };

    fetchLists();
  }, [isSubmitted]);

  return (
    <div className='w-full p-8 flex flex-row gap-4 max-sm:flex-col max-sm:items-center'>
      {lists?.map((list) => (
        <ListCard
          list={list}
          key={list?._id}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
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
            plusIconStyles='fill-white stroke-1 stroke-white'
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
            setToggle={setToggleAddCard}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
