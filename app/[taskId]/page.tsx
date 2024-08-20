'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Task = () => {
  const [task, setTask] = useState();
  const pathname = usePathname().substring(1);

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await fetch(`/api/task/${pathname}`, {
          method: 'POST',
          body: JSON.stringify({
            taskId: pathname,
          }),
        });

        const data = await response.json();

        setTask(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTask();
  }, []);

  return <div>{pathname}</div>;
};

export default Task;
