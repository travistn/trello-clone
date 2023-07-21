import { useState, useEffect, useRef } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

import { TaskProps } from '@/types';
import CustomButton from './CustomButton';
import useClickoutClose from '@/hooks/useClickoutClose';
import TaskDropdown from './TaskDropdown';

interface TaskCardProps {
  task: TaskProps;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const TaskCard = ({ task, setIsSubmitted }: TaskCardProps) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [description, setDescription] = useState('');

  const taskRef = useRef(null);

  useClickoutClose(taskRef, setToggleEdit);

  const updateTaskDescription = async () => {
    setIsSubmitted(true);

    try {
      await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          description,
          category: 'description',
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setToggleEdit(false);
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    setDescription(task.description);
  }, []);

  return (
    <div className='bg-white w-full h-fit p-2 flex flex-row items-center justify-between rounded-[8px] shadow-md cursor-pointer group relative hover:bg-gray-200'>
      <p className='text-[14px] text-navy pl-1 leading-5'>{task.description}</p>
      <div className='rounded-md p-2 hover:bg-gray-300 mr-[-0.3rem] invisible group-hover:visible'>
        <PencilIcon
          className='w-[11px] fill-white stroke-light-navy stroke-2'
          onClick={() => setToggleEdit((prevState) => !prevState)}
        />
      </div>
      {toggleEdit && (
        <div className='flex flex-col w-full absolute top-0 left-0 z-10'>
          <div ref={taskRef}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              spellCheck={false}
              className='text-[14px] text-navy p-3 resize-none outline-none h-[90px] w-full rounded-[8px] leading-5'
            />
            <CustomButton
              title='Save'
              containerStyles='w-fit bg-[#0c66e4] px-4 py-1.5 rounded-[4px] hover:bg-[#0055CC]'
              textStyles='text-[14px] text-white'
              btnType='submit'
              handleClick={updateTaskDescription}
            />
            <TaskDropdown
              task={task}
              setToggleEdit={setToggleEdit}
              setIsSubmitted={setIsSubmitted}
            />
          </div>
          <div className='fixed inset-0 bg-black/60 z-[-10] cursor-default' />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
