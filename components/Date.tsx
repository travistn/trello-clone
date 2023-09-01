import { useState } from 'react';
import { DateFormatter, DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { XMarkIcon } from '@heroicons/react/24/solid';

import 'react-day-picker/dist/style.css';
import '/styles/day-picker.css';
import CustomCaption from './CustomCaption';

interface DateProps {
  setOpenDate: (toggle: boolean) => void;
}

const Date = ({ setOpenDate }: DateProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const formatWeekdayName: DateFormatter = (day, options) => {
    return format(day, 'EEE', { locale: options?.locale });
  };

  return (
    <div className='bg-white rounded-[8px] w-[300px] cursor-default flex flex-col p-3 gap-2'>
      <header className='flex flex-row items-center'>
        <h3 className='text-[14px] text-light-navy font-semibold ml-auto'>Dates</h3>
        <div
          className='rounded-md p-1.5 ml-auto hover:bg-gray-300 hover:cursor-pointer'
          onClick={() => setOpenDate(false)}>
          <XMarkIcon className='w-[15px] text-light-navy stroke-light-navy stroke-[0.5]' />
        </div>
      </header>
      <div className='flex flex-col items-center'>
        <DayPicker
          mode='single'
          selected={selectedDate}
          onSelect={setSelectedDate}
          showOutsideDays
          formatters={{ formatWeekdayName }}
          components={{ Caption: CustomCaption }}
        />
      </div>
    </div>
  );
};

export default Date;
