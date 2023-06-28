import { XMarkIcon } from '@heroicons/react/24/solid';

import TaskCard from './TaskCard';
import { ListProps } from '@/types';

interface ListCardProps {
  list: ListProps;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const ListCard = ({ list, setIsSubmitted }: ListCardProps) => {
  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this list?');

    if (hasConfirmed) {
      setIsSubmitted(true);

      try {
        await fetch(`/api/list/${list._id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitted(false);
      }
    }
  };

  return (
    <div className='bg-[#f1f2f4] w-[272px] h-max flex flex-col gap-3 rounded-[12px] p-2'>
      <header className='flex flex-row justify-between items-center pl-3 pr-1'>
        <h2 className='text-[14px] text-dark-navy font-semibold'>{list.title}</h2>
        <XMarkIcon
          className='w-[15px] text-navy cursor-pointer stroke-navy stroke-[0.5]'
          onClick={handleDelete}
        />
      </header>
      {/* <TaskCard task='Wash the car' /> */}
    </div>
  );
};

export default ListCard;
