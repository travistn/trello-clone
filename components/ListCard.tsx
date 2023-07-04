import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import TaskCard from './TaskCard';
import CustomButton from './CustomButton';
import Form from './Form';
import { ListProps, TaskProps } from '@/types';

interface ListCardProps {
  list: ListProps;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const ListCard = ({ list, setIsSubmitted }: ListCardProps) => {
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

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

  const createTask = async () => {
    try {
      await fetch('/api/task/new', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Do the dishes',
          list: list._id,
        }),
      });
    } catch (error) {
      console.log(error);
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
  }, []);

  return (
    <div className='bg-[#f1f2f4] w-[272px] h-max flex flex-col gap-3 rounded-[12px] p-2'>
      <header className='flex flex-row justify-between items-center pl-3 pr-1'>
        <h2 className='text-[14px] text-dark-navy font-semibold'>{list.title}</h2>
        <XMarkIcon
          className='w-[15px] text-navy cursor-pointer stroke-navy stroke-[0.5]'
          onClick={handleDelete}
        />
      </header>
      <button onClick={createTask}>Add Task</button>
      {tasks
        .filter((task: { list: string }) => task.list === list?._id)
        .map((task: TaskProps) => (
          <TaskCard task={task} key={task._id} />
        ))}
      {/* {!toggleAddTask ? (
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
        />
      )} */}
    </div>
  );
};

export default ListCard;
