import { useState, RefObject } from 'react';
import { Menu } from '@headlessui/react';
import { ArchiveBoxXMarkIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

import { TaskProps } from '@/types';
import MoveCard from './MoveCard';

interface TaskDropDownProps {
  task: TaskProps;
  setToggleEdit: (toggle: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const TaskDropdown = ({ task, setToggleEdit, setIsSubmitted }: TaskDropDownProps) => {
  const [openMove, setOpenMove] = useState(false);

  const deleteTask = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this task?');

    if (hasConfirmed) {
      setIsSubmitted(true);

      try {
        await fetch(`/api/task/${task._id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setToggleEdit(false);
        setIsSubmitted(false);
      }
    }
  };

  return (
    <Menu as='div' className='max-sm:mt-2 md:absolute md:right-[-8rem] md:top-0'>
      <div className='flex flex-col gap-1'>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-black text-white' : 'bg-[#0009] text-[#c7d1db]'
              } flex flex-row items-center gap-2 rounded-[3px] text-[14px] leading-[20px] px-3 py-1.5 transition-transform duration-100 ease-in hover:translate-x-1`}
              onClick={deleteTask}>
              <ArchiveBoxXMarkIcon className='w-[14px]' />
              Delete Task
            </button>
          )}
        </Menu.Item>
        <div className='relative'>
          <Menu.Item as='div' className='relative'>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-black text-white' : 'bg-[#0009] text-[#c7d1db]'
                } flex flex-row items-center gap-2 rounded-[3px] text-[14px] leading-[20px] px-3 py-1.5 transition-transform duration-100 ease-in hover:translate-x-1`}
                onClick={() => setOpenMove((prevState) => !prevState)}>
                <ArrowRightIcon
                  className={`${active ? 'stroke-white' : 'stroke-[#c7d1db]'} w-[14px]`}
                />
                Move
              </button>
            )}
          </Menu.Item>
          {openMove && (
            <div className='absolute mt-2'>
              <MoveCard task={task} setOpenMove={setOpenMove} setIsSubmitted={setIsSubmitted} />
            </div>
          )}
        </div>
      </div>
    </Menu>
  );
};

export default TaskDropdown;
