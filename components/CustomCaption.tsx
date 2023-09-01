import { CaptionProps, useNavigation } from 'react-day-picker';
import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const CustomCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <h4 className='flex flex-row justify-between items-center mb-2 text-navy'>
      <ChevronLeftIcon
        aria-disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className='w-[16px] stroke-navy stroke-1 cursor-pointer'
      />
      <span className='font-semibold'>{format(props.displayMonth, 'MMMM yyy')}</span>
      <ChevronRightIcon
        aria-disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className='w-[16px] stroke-navy stroke-1 cursor-pointer'
      />
    </h4>
  );
};

export default CustomCaption;
