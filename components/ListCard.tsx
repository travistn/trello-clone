import TaskCard from './TaskCard';
import { ListCardProps } from '@/types';

const ListCard = ({ title }: ListCardProps) => {
  return (
    <div className='bg-[#f1f2f4] w-[272px] h-max flex flex-col gap-3 rounded-[12px] p-2'>
      <header className='ml-3'>
        <h2 className='text-[14px] text-dark-navy font-semibold'>{title}</h2>
      </header>
      <TaskCard task='Wash the car' />
    </div>
  );
};

export default ListCard;
