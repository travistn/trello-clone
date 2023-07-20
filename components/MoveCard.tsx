import { XMarkIcon } from '@heroicons/react/24/solid';
import { Listbox } from '@headlessui/react';

import CustomButton from './CustomButton';

interface MoveCardProps {
  setOpenMove: (openMove: boolean) => void;
}

const MoveCard = ({ setOpenMove }: MoveCardProps) => {
  return (
    <div className='p-3 bg-white rounded-[8px] w-[300px] cursor-default'>
      <header className='flex flex-row items-center'>
        <h3 className='text-[14px] text-light-navy font-semibold ml-auto'>Move card</h3>
        <div className='rounded-md p-1.5 ml-auto hover:bg-gray-300 hover:cursor-pointer'>
          <XMarkIcon
            className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]'
            onClick={() => setOpenMove(false)}
          />
        </div>
      </header>
      <div className='flex flex-col gap-2 mt-4'>
        <h4 className='text-[12px] text-light-navy font-semibold leading-4'>Select destination</h4>
        <div className='flex flex-row gap-2 w-full'>
          <Listbox as='div' className='bg-[#f1f2f4] rounded-[3px] relative w-[200px]'>
            <div className='flex flex-col px-2 py-1 rounded-[3px] hover:bg-gray-300'>
              <Listbox.Label className='text-[12px] text-light-navy cursor-pointer'>
                List
              </Listbox.Label>
              <Listbox.Button className='text-left text-[14px] text-navy '>To Do</Listbox.Button>
            </div>
            <Listbox.Options className='text-[14px] text-navy bg-white absolute w-full border border-gray-500'>
              <Listbox.Option
                value='To Do'
                className={({ active }) =>
                  `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-2`
                }>
                To Do
              </Listbox.Option>
              <Listbox.Option
                value='In Progress'
                className={({ active }) =>
                  `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-2`
                }>
                In Progress
              </Listbox.Option>
              <Listbox.Option
                value='Completed'
                className={({ active }) =>
                  `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-2`
                }>
                Completed
              </Listbox.Option>
            </Listbox.Options>
          </Listbox>
          <Listbox as='div' className='bg-[#f1f2f4] rounded-[3px] relative w-[80px]'>
            <div className='flex flex-col px-2 py-1 rounded-[3px] hover:bg-gray-300'>
              <Listbox.Label className='text-[12px] text-light-navy cursor-pointer'>
                Position
              </Listbox.Label>
              <Listbox.Button className='text-left text-[14px] text-navy '>1</Listbox.Button>
            </div>
            <Listbox.Options className='text-[14px] text-navy bg-white absolute w-full border border-gray-500'>
              <Listbox.Option
                value='1'
                className={({ active }) =>
                  `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-2`
                }>
                1
              </Listbox.Option>
              <Listbox.Option
                value='2'
                className={({ active }) =>
                  `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-2`
                }>
                2
              </Listbox.Option>
              <Listbox.Option
                value='3'
                className={({ active }) =>
                  `${active ? 'text-white bg-[#388bff]' : 'text-navy'} px-2`
                }>
                3
              </Listbox.Option>
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <CustomButton
        title='Move'
        containerStyles='w-fit bg-[#0c66e4] px-4 py-1.5 rounded-[4px] mt-3 hover:bg-[#0055CC]'
        textStyles='text-[14px] text-white'
      />
    </div>
  );
};

export default MoveCard;