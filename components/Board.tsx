'use client';

import { useState, useEffect, FormEvent } from 'react';

import ListCard from './ListCard';
import CustomButton from './CustomButton';
import Form from './Form';
import useListStore from '@/store/store';

const Board = () => {
  const [list, setList] = useState({ title: '' });
  const [toggleAddCard, setToggleAddCard] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const lists = useListStore((state) => state.lists);
  const setLists = useListStore((state) => state.setLists);

  const createList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      await fetch('/api/list/new', {
        method: 'POST',
        body: JSON.stringify({
          title: list.title,
        }),
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
      const response = await fetch('/api/list', { next: { revalidate: 0 } });
      const data = await response.json();

      setLists(data);
    };

    fetchLists();
  }, [isSubmitted]);

  return (
    <div className='w-full h-full px-8 pt-8 pb-14 max-sm:pb-8'>
      <div className='h-full flex flex-row gap-4 scrollbar max-sm:flex-col max-sm:items-center md:overflow-x-auto'>
        {lists?.map((list) => (
          <div className='h-full pb-1.5' key={list?._id}>
            <ListCard list={list} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
          </div>
        ))}
        <div
          className={`w-[272px] h-max rounded-[12px] px-4 py-3 md:min-w-[272px] ${
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
    </div>
  );
};

export default Board;
