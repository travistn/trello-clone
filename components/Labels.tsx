import { useState, useEffect } from 'react';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/solid';

import { LabelProps } from '@/types';

interface LabelsProps {
  setOpenLabels: (toggle: boolean) => void;
}

const Labels = ({ setOpenLabels }: LabelsProps) => {
  const [labels, setLabels] = useState([]);

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
        <h3 className='text-[14px] text-light-navy font-semibold ml-auto'>Labels</h3>
        <div className='rounded-md p-1.5 ml-auto hover:bg-gray-300 hover:cursor-pointer'>
          <XMarkIcon
            className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]'
            onClick={() => setOpenLabels(false)}
          />
        </div>
      </header>
      <div className='flex flex-col gap-2 mt-2'>
        {labels.map((label: LabelProps) => (
          <div key={label._id} className='flex flex-row items-center justify-between gap-2 pl-2'>
            <input type='checkbox' className='w-4 h-4 cursor-pointer' />
            <div className={`w-[210px] h-[30px] bg-${label.color} rounded-[3px]`} />
            <div className='rounded-[3px] p-2 cursor-pointer hover:bg-gray-300'>
              <PencilIcon className='w-[11px] fill-white stroke-light-navy stroke-2' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labels;
