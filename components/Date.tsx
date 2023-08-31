import { XMarkIcon } from '@heroicons/react/24/solid';

interface DateProps {
  setOpenDate: (toggle: boolean) => void;
}

const Date = ({ setOpenDate }: DateProps) => {
  return (
    <div className='bg-white rounded-[8px] w-[300px] cursor-default'>
      <header className='flex flex-row items-center p-3'>
        <h3 className='text-[14px] text-light-navy font-semibold ml-auto'>Dates</h3>
        <div
          className='rounded-md p-1.5 ml-auto hover:bg-gray-300 hover:cursor-pointer'
          onClick={() => setOpenDate(false)}>
          <XMarkIcon className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]' />
        </div>
      </header>
    </div>
  );
};

export default Date;
