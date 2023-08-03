import { XMarkIcon } from '@heroicons/react/24/solid';

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
    </div>
  );
};

export default Labels;
