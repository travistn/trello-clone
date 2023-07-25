import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import CustomButton from './CustomButton';
import useListStore from '@/store/store';
import { TaskProps } from '@/types';

interface MoveCardProps {
  task: TaskProps;
  setOpenMove: (openMove: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setToggleEdit: (toggle: boolean) => void;
}

const MoveCard = ({ task, setOpenMove, setIsSubmitted, setToggleEdit }: MoveCardProps) => {
  const lists = useListStore((state) => state.lists);
  const list = lists.find((list) => task.list === list._id);

  const [selectedList, setSelectedList] = useState(list);
  const [selectedPosition, setSelectedPostion] = useState(list?.tasks?.indexOf(task));

  const changeTaskList = async () => {
    setIsSubmitted(true);

    try {
      await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          task: task,
          list: selectedList?._id,
          category: 'list',
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitted(false);
    }
  };

  const moveIndexes = (arr: any, oldIndex: number, newIndex: number) => {
    while (oldIndex < 0) {
      oldIndex += arr.length;
    }
    while (newIndex < 0) {
      newIndex += arr.length;
    }
    if (newIndex >= arr.length) {
      var k = newIndex - arr.length;
      while (k-- + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  };

  const updateTaskPosition = async () => {
    setIsSubmitted(true);

    try {
      const changedTaskPositions = moveIndexes(
        list?.tasks,
        list?.tasks?.indexOf(task) as number,
        selectedPosition as number
      ).map((task: { _id: string }) => task._id);

      await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          list,
          category: 'position',
          tasks: changedTaskPositions,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setToggleEdit(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className='p-3 bg-white rounded-[8px] w-[300px] cursor-default'>
      <header className='flex flex-row items-center'>
        <h3 className='text-[14px] text-light-navy font-semibold ml-auto'>Move card</h3>
        <div className='rounded-md p-1.5 ml-auto hover:bg-gray-300 hover:cursor-pointer'>
          <XMarkIcon
            className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]'
            onClick={() => setOpenMove(false)}
          />
        </div>
      </header>
      <div className='flex flex-col gap-2 mt-4'>
        <h4 className='text-[12px] text-light-navy font-semibold leading-4'>Select destination</h4>
        <div className='flex flex-row gap-2 w-full'>
          <Listbox
            as='div'
            value={selectedList}
            onChange={setSelectedList}
            id='list'
            className='bg-[#f1f2f4] rounded-[3px] relative w-[200px]'>
            <div className='flex flex-col px-2 py-1 rounded-[3px] hover:bg-gray-300'>
              <Listbox.Label className='text-[12px] text-light-navy cursor-pointer'>
                List
              </Listbox.Label>
              <Listbox.Button className='text-left text-[14px] text-navy '>
                {selectedList?.title}
              </Listbox.Button>
            </div>
            <Listbox.Options className='text-[14px] text-navy bg-white absolute w-full border border-gray-500'>
              {lists.map((list) => (
                <Listbox.Option
                  value={list}
                  key={list._id}
                  className={({ active }) =>
                    `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-2`
                  }>
                  {task.list === list._id ? `${list.title} (current)` : list.title}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <Listbox
            as='div'
            value={selectedPosition}
            onChange={setSelectedPostion}
            id='position'
            className='bg-[#f1f2f4] rounded-[3px] relative w-[80px]'>
            <div className='flex flex-col px-2 py-1 rounded-[3px] hover:bg-gray-300'>
              <Listbox.Label className='text-[12px] text-light-navy cursor-pointer'>
                Position
              </Listbox.Label>
              <Listbox.Button className='text-left text-[14px] text-navy '>
                {selectedPosition ? selectedPosition + 1 : 0 + 1}
              </Listbox.Button>
            </div>
            <Listbox.Options className='text-[14px] text-navy bg-white absolute w-full border border-gray-500'>
              {list?.tasks?.map((_, index) => (
                <Listbox.Option
                  key={index}
                  value={index}
                  className={({ active }) =>
                    `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-1`
                  }>
                  {list?.tasks?.indexOf(task) === index ? `${index + 1} (current)` : `${index + 1}`}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <CustomButton
        title='Move'
        containerStyles='w-fit bg-[#0c66e4] px-4 py-1.5 rounded-[4px] mt-3 hover:bg-[#0055CC]'
        textStyles='text-[14px] text-white'
        handleClick={() => {
          if (selectedList?._id !== list?._id) changeTaskList();
          else if (selectedPosition !== list?.tasks?.indexOf(task)) updateTaskPosition();
        }}
      />
    </div>
  );
};

export default MoveCard;
