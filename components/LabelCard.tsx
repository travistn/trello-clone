import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

import { LabelProps, TaskProps } from '@/types';

interface LabelCardProps {
  label: LabelProps;
  task: TaskProps;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setToggleEditLabel: (toggle: boolean) => void;
  setSelectedLabel: (label: LabelProps) => void;
}

const LabelCard = ({
  label,
  task,
  setIsSubmitted,
  setToggleEditLabel,
  setSelectedLabel,
}: LabelCardProps) => {
  const [labelChecked, setLabelChecked] = useState(false);

  const handleLabelCheck = () => {
    const addOrRemoveLabel = async () => {
      setIsSubmitted(true);

      try {
        await fetch(`/api/label/${label._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            label,
            task,
            action: !labelChecked ? 'addLabel' : 'removeLabel',
          }),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitted(false);
      }
    };

    addOrRemoveLabel();
  };

  useEffect(() => {
    task?.labels?.find((item) => item._id === label._id)
      ? setLabelChecked(true)
      : setLabelChecked(false);
  }, [task]);

  return (
    <div className='flex flex-row items-center justify-between gap-2 pl-2'>
      <input
        type='checkbox'
        checked={labelChecked}
        onChange={handleLabelCheck}
        className='w-4 h-4 cursor-pointer'
      />
      <div
        className={`w-[210px] h-[30px] bg-${label.color} rounded-[3px] cursor-pointer hover:brightness-[.80]`}
        onClick={handleLabelCheck}
      />
      <div className='rounded-[3px] p-2 cursor-pointer hover:bg-gray-300'>
        <PencilIcon
          className='w-[11px] fill-white stroke-light-navy stroke-2'
          onClick={() => {
            setToggleEditLabel(true);
            setSelectedLabel(label);
          }}
        />
      </div>
    </div>
  );
};

export default LabelCard;
