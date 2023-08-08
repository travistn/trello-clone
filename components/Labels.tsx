import { useState, useEffect, FormEvent } from 'react';
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

import { LabelProps, TaskProps } from '@/types';
import LabelCard from './LabelCard';
import CustomButton from './CustomButton';

interface LabelsProps {
  task: TaskProps;
  setOpenLabels: (toggle: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const Labels = ({ task, setOpenLabels, setIsSubmitted }: LabelsProps) => {
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState<LabelProps>();

  const [labelTitle, setLabelTitle] = useState('');
  const [toggleEditLabel, setToggleEditLabel] = useState(false);

  const editLabel = async () => {
    try {
      await fetch(`/api/label/${selectedLabel?._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          label: selectedLabel,
          title: labelTitle,
          action: 'editLabel',
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setToggleEditLabel(false);
    }
  };

  useEffect(() => {
    const fetchLabels = async () => {
      const response = await fetch('/api/label');
      const data = await response.json();

      setLabels(data);
    };

    fetchLabels();
  }, [toggleEditLabel]);

  return (
    <div className='bg-white rounded-[8px] w-[300px] cursor-default'>
      <header className='flex flex-row items-center p-3'>
        {toggleEditLabel && (
          <div className='rounded-md p-1.5 hover:bg-gray-300 hover:cursor-pointer'>
            <ChevronLeftIcon
              className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]'
              onClick={() => setToggleEditLabel(false)}
            />
          </div>
        )}
        <h3 className='text-[14px] text-light-navy font-semibold ml-auto'>
          {!toggleEditLabel ? 'Labels' : 'Edit label'}
        </h3>
        <div className='rounded-md p-1.5 ml-auto hover:bg-gray-300 hover:cursor-pointer'>
          <XMarkIcon
            className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]'
            onClick={() => setOpenLabels(false)}
          />
        </div>
      </header>
      {!toggleEditLabel ? (
        <div className='flex flex-col gap-2 px-3 pb-3'>
          {labels.map((label: LabelProps) => (
            <LabelCard
              label={label}
              task={task}
              key={label._id}
              setIsSubmitted={setIsSubmitted}
              setToggleEditLabel={setToggleEditLabel}
              setSelectedLabel={setSelectedLabel}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <div className='bg-[#f7f8f9] p-8 flex justify-center items-center'>
            <div
              className={`w-[230px] h-[32px] bg-${selectedLabel?.color} rounded-[3px] text-[14px] font-medium pl-3 flex items-center text-ellipsis whitespace-nowrap`}>
              {selectedLabel?.title}
            </div>
          </div>
          <div className='flex flex-col gap-1 p-3 w-full'>
            <label className='text-[12px] text-light-navy font-semibold'>Title</label>
            <input
              autoFocus
              onChange={(e) => setLabelTitle(e.target.value)}
              className='text-[14px] text-navy px-2 py-1.5 border-2 border-[#dcdfe4] rounded-[3px] focus:outline-[#1D7AFC]'
            />
            <CustomButton
              title='Save'
              containerStyles='w-fit bg-[#0c66e4] px-4 py-1.5 rounded-[3px] mt-1.5 hover:bg-[#0055CC]'
              textStyles='text-[14px] text-white'
              btnType='button'
              handleClick={editLabel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Labels;
