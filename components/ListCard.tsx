import { useState, useEffect, FormEvent, KeyboardEventHandler } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import TaskCard from './TaskCard';
import CustomButton from './CustomButton';
import Form from './Form';
import { ListProps, TaskProps } from '@/types';

interface ListCardProps {
  list: ListProps;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const ListCard = ({ list, isSubmitted, setIsSubmitted }: ListCardProps) => {
  const [task, setTask] = useState({ description: '' });
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [toggleAddTask, setToggleAddTask] = useState(false);

  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this list?');

    if (hasConfirmed) {
      setIsSubmitted(true);

      try {
        await fetch(`/api/list/${list._id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitted(false);
      }
    }
  };

  const updateTitle: KeyboardEventHandler<HTMLTextAreaElement> = async (e) => {
    const target = e.target as HTMLTextAreaElement;

    if (e.key === 'Enter') {
      e.preventDefault();

      try {
        await fetch(`/api/list/${list._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title,
          }),
        });
      } catch (error) {
        console.log(error);
      } finally {
        target.blur();
      }
    }
  };

  const createTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      await fetch('/api/task/new', {
        method: 'POST',
        body: JSON.stringify({
          description: task.description,
          list: list._id,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTask({ description: '' });
      setToggleAddTask(false);
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks', {
        method: 'GET',
      });
      const data = await response.json();

      setTasks(data);
    };

    fetchTasks();
  }, [isSubmitted]);

  useEffect(() => {
    setTitle(list?.title);
  }, []);

  return (
    <div className='bg-[#f1f2f4] w-[272px] h-max flex flex-col gap-3 rounded-[12px] p-2 select-none md:min-w-[272px]'>
      <header className='flex flex-row justify-between items-center pl-2'>
        <h2 className='text-[14px] text-dark-navy font-semibold'>
          <textarea
            value={title}
            onChange={(e) => setTitle?.(e.target.value)}
            onKeyDown={updateTitle}
            onFocus={(e) => e.target.select()}
            spellCheck={false}
            className='overflow-hidden h-[28px] rounded-[3px] resize-none p-1 mb-[-0.3rem] bg-inherit outline-[#1D7AFC] whitespace-nowrap'
          />
        </h2>
        <div className='rounded-md p-1.5 mr-[0.1rem] hover:bg-gray-300'>
          <XMarkIcon
            className='w-[14px] text-navy cursor-pointer stroke-navy stroke-[0.5]'
            onClick={handleDelete}
          />
        </div>
      </header>
      {tasks
        .filter((task: { list: string }) => task.list === list?._id)
        .map((task: TaskProps) => (
          <TaskCard task={task} setIsSubmitted={setIsSubmitted} key={task._id} />
        ))}
      {!toggleAddTask ? (
        <CustomButton
          title='Add a task'
          containerStyles='w-full px-2 py-1 rounded-[8px] hover:bg-gray-300'
          textStyles='text-light-navy text-[14px]'
          btnType='button'
          plusIcon={true}
          plusIconStyles='fill-light-navy stroke-[0.5] stroke-light-navy'
          handleClick={() => setToggleAddTask((prevState) => !prevState)}
        />
      ) : (
        <Form
          placeholder='Enter a task...'
          btnTitle='Add task'
          handleCloseClick={() => setToggleAddTask((prevState) => !prevState)}
          task={task}
          setTask={setTask}
          handleSubmit={createTask}
          setToggle={setToggleAddTask}
        />
      )}
    </div>
  );
};

export default ListCard;
