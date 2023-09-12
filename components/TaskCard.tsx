import { useState, useEffect, useRef } from 'react';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import { format } from 'date-fns';
import moment from 'moment';
import { PencilIcon, ClockIcon } from '@heroicons/react/24/solid';

import { TaskProps } from '@/types';
import CustomButton from './CustomButton';
import useClickoutClose from '@/hooks/useClickoutClose';
import TaskDropdown from './TaskDropdown';
import Tooltip from './Tooltip';

interface TaskCardProps {
  task: TaskProps;
  setIsSubmitted: (isSubmitted: boolean) => void;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TaskCard = ({
  task,
  setIsSubmitted,
  draggableProps,
  dragHandleProps,
  innerRef,
}: TaskCardProps) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [description, setDescription] = useState('');
  const [isDue, setIsDue] = useState<boolean>();

  const taskRef = useRef(null);

  useClickoutClose(taskRef, setToggleEdit);

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

  const updateTaskDescription = async () => {
    setIsSubmitted(true);

    try {
      await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          description,
          action: 'updateTaskDescription',
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setToggleEdit(false);
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    setDescription(task.description);
  }, []);

  useEffect(() => {
    const updateTaskOrder = async () => {
      await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          task,
          action: 'updateTaskOrder',
        }),
      });
    };
    updateTaskOrder();
  }, [task.order]);

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
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className='bg-white w-full h-fit p-2 flex flex-col rounded-[8px] shadow-md cursor-pointer group/task relative hover:bg-gray-200'>
      {(task?.labels?.length as number) > 0 && (
        <div className='flex flex-row flex-wrap gap-1 pl-1 mb-1'>
          {task?.labels?.map((label) => (
            <div className='group/label' key={label._id}>
              <div
                className={`h-[6.5px] min-w-[40px] max-w-[40px] rounded-[8px] bg-${label.color} hover:brightness-[.80]`}
              />
              <Tooltip label={label} />
            </div>
          ))}
        </div>
      )}
      <div className='flex flex-row items-center justify-between'>
        <p className='text-[14px] text-navy pl-1 leading-5'>{task.description}</p>
        <div
          className='rounded-md p-2 hover:bg-gray-300 mr-[-0.3rem] invisible group-hover/task:visible cursor-pointer'
          onClick={() => setToggleEdit((prevState) => !prevState)}>
          <PencilIcon className='w-[11px] fill-white stroke-light-navy stroke-2' />
        </div>
      </div>
      {task.dueDate && (
        <div
          className={`w-fit flex flex-row items-center gap-2 px-1.5 py-1 rounded-[3px] cursor-pointer ${
            task.isDue
              ? getDueStyles(new Date(task.dueDate), 'div')
              : 'bg-[#1f845a] hover:bg-[#216e4e]'
          }`}
          onClick={updateTaskDue}>
          <ClockIcon
            className={`w-[16px] h-[16px] stroke-[1.5] ${
              task.isDue
                ? getDueStyles(new Date(task.dueDate), 'icon')
                : 'fill-[#1f845a] stroke-white'
            }`}
          />
          <p
            className={`text-[12px] ${
              task.isDue ? getDueStyles(new Date(task.dueDate), 'p') : 'text-white'
            }`}>
            {format(new Date(task.dueDate), 'MMM d')}
          </p>
        </div>
      )}

      {toggleEdit && (
        <div className='flex flex-col w-full absolute top-0 left-0 z-10'>
          <div ref={taskRef}>
            <div className='flex flex-col p-2 bg-white rounded-[8px] '>
              {(task?.labels?.length as number) > 0 && (
                <div className='flex flex-row flex-wrap gap-1 pl-1 mb-1'>
                  {task?.labels?.map((label) => (
                    <div
                      className='group/label transition-all duration-200 ease-in'
                      key={label._id}>
                      <div
                        className={`h-[6.5px] min-w-[40px] max-w-[40px] rounded-[8px] bg-${label.color} hover:brightness-[.80]`}
                      />
                      <Tooltip label={label} />
                    </div>
                  ))}
                </div>
              )}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                spellCheck={false}
                className='text-[14px] p-1 text-navy resize-none outline-none h-[80px] w-full rounded-[8px] leading-5'
              />
              {task.dueDate && (
                <div
                  className={`w-fit flex flex-row items-center gap-2 px-1.5 py-1 rounded-[3px] cursor-pointer ${
                    task.isDue
                      ? getDueStyles(new Date(task.dueDate), 'div')
                      : 'bg-[#1f845a] hover:bg-[#216e4e]'
                  }`}
                  onClick={updateTaskDue}>
                  <ClockIcon
                    className={`w-[16px] h-[16px] stroke-[1.5] ${
                      task.isDue
                        ? getDueStyles(new Date(task.dueDate), 'icon')
                        : 'fill-[#1f845a] stroke-white'
                    }`}
                  />
                  <p
                    className={`text-[12px] ${
                      task.isDue ? getDueStyles(new Date(task.dueDate), 'p') : 'text-white'
                    }`}>
                    {format(new Date(task.dueDate), 'MMM d')}
                  </p>
                </div>
              )}
            </div>
            <CustomButton
              title='Save'
              containerStyles='w-fit bg-[#0c66e4] px-4 py-1.5 rounded-[4px] mt-1.5 hover:bg-[#0055CC]'
              textStyles='text-[14px] text-white'
              btnType='submit'
              handleClick={updateTaskDescription}
            />
            <TaskDropdown
              task={task}
              setToggleEdit={setToggleEdit}
              setIsSubmitted={setIsSubmitted}
            />
          </div>
          <div className='fixed inset-0 bg-black/60 z-[-10] cursor-default' />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
