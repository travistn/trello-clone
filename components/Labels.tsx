import { useState, useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

import { LabelProps, TaskProps } from '@/types';
import LabelCard from './LabelCard';

interface LabelsProps {
  task: TaskProps;
  setOpenLabels: (toggle: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const Labels = ({ task, setOpenLabels, setIsSubmitted }: LabelsProps) => {
  const [labels, setLabels] = useState([]);
  const [toggleEditLabel, setToggleEditLabel] = useState(false);

  useEffect(() => {
    const fetchLabels = async () => {
      const response = await fetch('/api/label');
      const data = await response.json();

      setLabels(data);
    };

    fetchLabels();
  }, []);

  return (
    <div className='p-3 bg-white rounded-[8px] w-[300px] cursor-default'>
      <header className='flex flex-row items-center'>
        {toggleEditLabel && (
          <div className='rounded-md p-1.5 hover:bg-gray-300 hover:cursor-pointer'>
            <ChevronLeftIcon
              className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]'
              onClick={() => setToggleEditLabel(false)}
            />
          </div>
        )}
        <h3 className='text-[14px] text-light-navy font-semibold ml-auto'>
          {!toggleEditLabel ? 'Labels' : 'Edit Labels'}
        </h3>
        <div className='rounded-md p-1.5 ml-auto hover:bg-gray-300 hover:cursor-pointer'>
          <XMarkIcon
            className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]'
            onClick={() => setOpenLabels(false)}
          />
        </div>
      </header>
      {!toggleEditLabel ? (
        <div className='flex flex-col gap-2 mt-2'>
          {labels.map((label: LabelProps) => (
            <LabelCard
              label={label}
              task={task}
              key={label._id}
              setIsSubmitted={setIsSubmitted}
              setToggleEditLabel={setToggleEditLabel}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Labels;
