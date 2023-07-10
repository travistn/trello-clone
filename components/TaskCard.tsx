import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

import { TaskProps } from '@/types';
import CustomButton from './CustomButton';

interface TaskCardProps {
  task: TaskProps;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [description, setDescription] = useState('');

  const updateTaskDescription = async () => {
    try {
      await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          description,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setToggleEdit(false);
    }
  };

  useEffect(() => {
    setDescription(task.description);
  }, []);

  return (
    <>
      {!toggleEdit ? (
        <div className='bg-white w-full h-fit p-2 flex flex-row items-center justify-between rounded-[8px] shadow-md cursor-pointer group hover:bg-gray-200'>
          <p className='text-[14px] text-navy pl-1'>{task.description}</p>
          <div className='rounded-md p-2 hover:bg-gray-300 mr-[-0.3rem] invisible group-hover:visible'>
            <PencilIcon
              className='w-[11px] fill-white stroke-light-navy stroke-2'
              onClick={() => setToggleEdit((prevState) => !prevState)}
            />
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            spellCheck={false}
            className='text-[14px] text-navy p-3 resize-none outline-none h-[90px] w-full rounded-[8px]'
          />
          <CustomButton
            title='Save'
            containerStyles='w-fit bg-[#0c66e4] px-4 py-1.5 rounded-[4px] hover:bg-[#0055CC]'
            textStyles='text-[14px] text-white'
            btnType='submit'
            handleClick={updateTaskDescription}
          />
        </div>
      )}
    </>
  );
};

export default TaskCard;
