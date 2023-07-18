import { RefObject } from 'react';
import { Menu } from '@headlessui/react';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';

import useClickoutClose from '@/hooks/useClickoutClose';
import { TaskProps } from '@/types';

interface TaskDropDownProps {
  task: TaskProps;
  taskRef: RefObject<HTMLFormElement>;
  setToggleEdit: (toggle: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const TaskDropdown = ({ task, taskRef, setToggleEdit, setIsSubmitted }: TaskDropDownProps) => {
  useClickoutClose(taskRef, setToggleEdit);

  const deleteTask = async () => {
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
  };

  return (
    <Menu as='div' className='max-sm:mt-2 md:absolute md:right-[-8rem]' ref={taskRef}>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? 'bg-black text-white' : 'bg-[#0009] text-[#c7d1db]'
            } flex flex-row items-center gap-2 rounded-[3px] text-[14px] leading-[20px] px-3 py-1.5`}
            onClick={deleteTask}>
            <ArchiveBoxXMarkIcon className='w-[14px]' />
            Delete Task
          </button>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default TaskDropdown;
