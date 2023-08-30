import { useState, useEffect } from 'react';
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

  const setLists = useListStore((state) => state.setLists);

  const [selectedList, setSelectedList] = useState(list);
  const [selectedPosition, setSelectedPostion] = useState(selectedList?.tasks?.indexOf(task));

  const changeTaskPosition = async () => {
    setIsSubmitted(true);

    try {
      if (list?._id === selectedList?._id) {
        const result = Array.from(selectedList?.tasks as ArrayLike<TaskProps>);
        const [removed] = result.splice(result.indexOf(task), 1);
        result.splice(selectedPosition as number, 0, removed);

        const rearrangedTasks = result.map((task, index) => ({ ...task, order: index + 1 }));

        setLists(
          lists.map((item) => (item._id === list?._id ? { ...item, tasks: rearrangedTasks } : item))
        );
      } else if (list?._id !== selectedList?._id) {
        const newList = lists.find((list) => list._id === selectedList?._id);

        const withdrawnList = Array.from(list?.tasks as ArrayLike<TaskProps>);
        const [removed] = withdrawnList.splice(withdrawnList.indexOf(task), 1);

        const injectedList = Array.from(newList?.tasks as ArrayLike<TaskProps>);
        injectedList.splice(selectedPosition as number, 0, removed);

        const rearrangedTasksOldList = withdrawnList.map((task, index) => ({
          ...task,
          order: index + 1,
        }));
        const rearrangedTasksNewList = injectedList.map((task, index) => ({
          ...task,
          order: index + 1,
          list: selectedList?._id,
        }));

        setLists(
          lists.map((item) =>
            item._id === list?._id
              ? { ...item, tasks: rearrangedTasksOldList }
              : item._id === newList?._id
              ? { ...item, tasks: rearrangedTasksNewList }
              : item
          )
        );

        const removeAndAddTask = async () => {
          await fetch(`/api/list/${selectedList?._id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              action: 'removeAndAddTask',
              task: removed,
              source_id: list?._id,
            }),
          });
        };

        removeAndAddTask();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setToggleEdit(false);
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (selectedList?.tasks?.indexOf(task) === -1) setSelectedPostion(selectedList?.tasks?.length);
    else if (selectedList?.tasks?.indexOf(task))
      setSelectedPostion(selectedList?.tasks?.indexOf(task));
  }, [selectedList]);

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
                {(selectedPosition as number) + 1}
              </Listbox.Button>
            </div>
            <Listbox.Options className='text-[14px] text-navy bg-white absolute w-full border border-gray-500'>
              {selectedList?.tasks?.map((_, index) => (
                <Listbox.Option
                  key={index}
                  value={index}
                  className={({ active }) =>
                    `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-1`
                  }>
                  {selectedList?.tasks?.indexOf(task) === index
                    ? `${index + 1} (current)`
                    : `${index + 1}`}
                </Listbox.Option>
              ))}
              {selectedList?._id !== list?._id && (
                <Listbox.Option
                  value={selectedList?.tasks?.length}
                  className={({ active }) =>
                    `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-1`
                  }>
                  {(selectedList?.tasks?.length as number) + 1}
                </Listbox.Option>
              )}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <CustomButton
        title='Move'
        containerStyles='w-fit bg-[#0c66e4] px-4 py-1.5 rounded-[4px] mt-3 hover:bg-[#0055CC]'
        textStyles='text-[14px] text-white'
        handleClick={changeTaskPosition}
      />
    </div>
  );
};

export default MoveCard;
