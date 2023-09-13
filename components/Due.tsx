import { useState } from 'react';
import moment from 'moment';
import { format } from 'date-fns';
import { ClockIcon } from '@heroicons/react/24/solid';

import { TaskProps } from '@/types';

interface DueProps {
  task: TaskProps;
  setIsSubmitted: (toggle: boolean) => void;
}

const Due = ({ task, setIsSubmitted }: DueProps) => {
  const [isDue, setIsDue] = useState<boolean>();

  const getDueStyles = (dueDate: Date, element: string) => {
    const currentDate = new Date();

    if (currentDate > dueDate) {
      if (element === 'div') return 'bg-[#ffedeb] hover:bg-[#ffd2cc]';
      if (element === 'icon') return 'fill-[#e34935] stroke-white';
      if (element === 'p') return 'text-[#ae2a19]';
    } else if (moment(task.dueDate).fromNow() === 'in a day') {
      if (element === 'div') return 'bg-[#e2b203] hover:bg-[#cf9f02]';
      if (element === 'icon') return 'fill-[#e2b203] stroke-light-navy';
      if (element === 'p') return 'text-light-navy';
    } else {
      if (element === 'div') return 'hover:bg-[#091e420f]';
      if (element === 'icon') return 'fill-white stroke-[#626f86]';
      if (element === 'p') return 'text-light-navy';
    }
  };

  const updateTaskDue = async () => {
    setIsSubmitted(true);
    try {
      await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          isDue,
          action: 'updateTaskDue',
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitted(false);
      setIsDue((prevState) => !prevState);
    }
  };

  return (
    <div
      className={`w-fit flex flex-row items-center gap-2 px-1.5 py-1 rounded-[3px] cursor-pointer ${
        task.isDue
          ? getDueStyles(new Date(task.dueDate as Date), 'div')
          : 'bg-[#1f845a] hover:bg-[#216e4e]'
      }`}
      onClick={updateTaskDue}>
      <ClockIcon
        className={`w-[16px] h-[16px] stroke-[1.5] ${
          task.isDue
            ? getDueStyles(new Date(task.dueDate as Date), 'icon')
            : 'fill-[#1f845a] stroke-white'
        }`}
      />
      <p
        className={`text-[12px] ${
          task.isDue ? getDueStyles(new Date(task.dueDate as Date), 'p') : 'text-white'
        }`}>
        {format(new Date(task.dueDate as Date), 'MMM d')}
      </p>
    </div>
  );
};

export default Due;
