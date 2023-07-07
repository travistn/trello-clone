import { TaskProps } from '@/types';

interface TaskCardProps {
  task: TaskProps;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className='bg-white rounded-[8px] p-2 w-full h-fit shadow-md cursor-pointer hover:bg-gray-200'>
      <p className='text-[14px] text-navy pl-1'>{task.description}</p>
    </div>
  );
};

export default TaskCard;
