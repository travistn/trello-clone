import { PencilIcon } from '@heroicons/react/24/solid';

import { TaskProps } from '@/types';

interface TaskCardProps {
  task: TaskProps;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className='bg-white rounded-[8px] p-2 w-full h-fit shadow-md cursor-pointer flex flex-row items-center justify-between group hover:bg-gray-200'>
      <p className='text-[14px] text-navy pl-1'>{task.description}</p>
      <div className='rounded-md p-2 hover:bg-gray-300 mr-[-0.3rem] invisible group-hover:visible'>
        <PencilIcon className='w-[11px] fill-white stroke-light-navy stroke-2' />
      </div>
    </div>
  );
};

export default TaskCard;
