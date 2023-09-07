import { ChangeEventHandler, useState } from 'react';
import { DateFormatter, DayPicker } from 'react-day-picker';
import { format, isValid, parse } from 'date-fns';
import { XMarkIcon } from '@heroicons/react/24/solid';

import 'react-day-picker/dist/style.css';
import '/styles/day-picker.css';
import CustomCaption from './CustomCaption';

interface DateProps {
  setOpenDate: (toggle: boolean) => void;
}

const formatWeekdayName: DateFormatter = (day, options) => {
  return format(day, 'EEE', { locale: options?.locale });
};

const addOneDay = (date: Date) => {
  date.setDate(date.getDate() + 1);
  return date;
};

const Dates = ({ setOpenDate }: DateProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addOneDay(new Date()));
  const [dayInputValue, setDayInputValue] = useState<string>(
    format(addOneDay(new Date()), 'M/d/Y')
  );
  const [timeInputValue, setTimeInputValue] = useState<string>(
    format(addOneDay(new Date()), 'p') || ''
  );
  const [checked, setChecked] = useState(true);

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDate(date);

    if (date) {
      setDayInputValue(format(date, 'M/d/Y'));
      setTimeInputValue(format(new Date(), 'p'));
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const date = parse(e.currentTarget.value, 'MM/dd/yyyy HH:mm', new Date());

    if (isValid(date)) {
      setSelectedDate(date);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div className='bg-white rounded-[8px] w-[300px] cursor-default flex flex-col p-3 gap-2'>
      <header className='grid grid-cols-3 justify-items-center items-center'>
        <h3 className='text-[14px] text-light-navy font-semibold col-start-2'>Dates</h3>
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
          onSelect={handleDaySelect}
          showOutsideDays
          formatters={{ formatWeekdayName }}
          components={{ Caption: CustomCaption }}
          onDayClick={() => setChecked(true)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-[12px] text-[#0c66e4] font-bold leading-4'>Due date</label>
        <div className='flex flex-row items-center gap-2'>
          <input
            type='checkbox'
            className='cursor-pointer w-4 h-4'
            defaultChecked={checked}
            onClick={() => setChecked((prevState) => !prevState)}
          />
          <input
            type='text'
            placeholder='M/D/YYYY'
            disabled={!checked}
            value={dayInputValue}
            onChange={handleInputChange}
            className={`w-[90px] text-[14px] leading-5 rounded-[3px] p-1.5 text-light-navy bg-[#fafafa] ${
              checked ? 'outline-[#0c66e4]' : 'cursor-not-allowed'
            }`}
          />
          <input
            type='text'
            placeholder='h:mm A'
            disabled={!checked}
            value={timeInputValue}
            onChange={handleInputChange}
            className={`w-[90px] text-[14px] leading-5 rounded-[3px] p-1.5 text-light-navy bg-[#fafafa] ${
              checked ? 'outline-[#0c66e4]' : 'cursor-not-allowed'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Dates;
