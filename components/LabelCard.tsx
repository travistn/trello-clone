import { PencilIcon } from '@heroicons/react/24/solid';

import { LabelProps, TaskProps } from '@/types';

interface LabelCardProps {
  label: LabelProps;
  task: TaskProps;
}

const LabelCard = ({ label, task }: LabelCardProps) => {
  const addLabel = async () => {
    await fetch(`/api/label/${label._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        label,
        task,
      }),
    });
  };

  return (
    <div className='flex flex-row items-center justify-between gap-2 pl-2'>
      <input type='checkbox' className='w-4 h-4 cursor-pointer' />
      <div
        className={`w-[210px] h-[30px] bg-${label.color} rounded-[3px] cursor-pointer hover:brightness-[.80]`}
        onClick={addLabel}
      />
      <div className='rounded-[3px] p-2 cursor-pointer hover:bg-gray-300'>
        <PencilIcon className='w-[11px] fill-white stroke-light-navy stroke-2' />
      </div>
    </div>
  );
};

export default LabelCard;
