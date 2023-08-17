'use client';

import { useState, useEffect, FormEvent } from 'react';
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd';

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
          order: lists.length + 1,
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

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'list') {
      const result = Array.from(lists);
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);

      const rearrangedLists = result.map((list, index) => ({ ...list, order: index + 1 }));

      setLists(rearrangedLists);
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch('/api/list', {
        method: 'GET',
      });
      const data = await response.json();

      setLists(data);
    };

    fetchLists();
  }, [isSubmitted]);

  return (
    <div className='w-full h-full px-8 pt-8 pb-14 max-sm:pb-8'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='list'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='h-full flex flex-row gap-4 scrollbar max-sm:flex-col max-sm:items-center md:overflow-x-auto'>
              {lists?.map((list, index) => (
                <Draggable draggableId={list._id as string} index={index} key={list._id}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className='h-full pb-1.5'>
                      <ListCard list={list} setIsSubmitted={setIsSubmitted} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div
                className={`w-[272px] h-max rounded-[12px] px-4 py-3 md:min-w-[272px] ${
                  !toggleAddCard
                    ? 'bg-[#68758b] cursor-pointer transition-colors duration-100 ease-in hover:bg-[#A6C5E229] '
                    : 'bg-white'
                }`}>
                {!toggleAddCard ? (
                  <div className='h-[25px] transition-[height] duration-200 ease-in'>
                    <CustomButton
                      title='Add another list'
                      containerStyles='w-full'
                      textStyles='text-white text-[14px]'
                      btnType='button'
                      plusIcon={true}
                      plusIconStyles='fill-white stroke-1 stroke-white'
                      handleClick={() => setToggleAddCard((prevState) => !prevState)}
                    />
                  </div>
                ) : (
                  <div className='h-[73px] transition-[height] duration-200 ease-in'>
                    <Form
                      placeholder='Enter list title...'
                      btnTitle='Add list'
                      handleCloseClick={() => setToggleAddCard((prevState) => !prevState)}
                      list={list}
                      setList={setList}
                      handleSubmit={createList}
                      setToggle={setToggleAddCard}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
