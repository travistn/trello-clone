import { TaskCardProps } from '@/types';

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className='bg-white rounded-[12px] p-2 w-full h-fit'>
      <p className='text-[14px] text-navy'>{task}</p>
    </div>
  );
};

export default TaskCard;
