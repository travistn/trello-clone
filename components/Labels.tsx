import { XMarkIcon, PencilIcon } from '@heroicons/react/24/solid';

interface LabelsProps {
  setOpenLabels: (toggle: boolean) => void;
}

const Labels = ({ setOpenLabels }: LabelsProps) => {
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
      <div className='flex flex-col gap-1 mt-2'>
        <div className='flex flex-row items-center justify-between gap-2 pl-2'>
          <input type='checkbox' className='w-4 h-4 cursor-pointer' />
          <div className='w-[210px] h-[30px] bg-green rounded-[3px]' />
          <div className='rounded-[3px] p-2 cursor-pointer hover:bg-gray-300'>
            <PencilIcon className='w-[11px] fill-white stroke-light-navy stroke-2' />
          </div>
        </div>
        <div className='flex flex-row items-center justify-between gap-2 pl-2'>
          <input type='checkbox' className='w-4 h-4 cursor-pointer' />
          <div className='w-[210px] h-[30px] bg-yellow rounded-[3px]' />
          <div className='rounded-[3px] p-2 cursor-pointer hover:bg-gray-300'>
            <PencilIcon className='w-[11px] fill-white stroke-light-navy stroke-2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
