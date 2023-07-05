import { XMarkIcon } from '@heroicons/react/24/solid';

import { FormProps } from '@/types';
import CustomButton from './CustomButton';

const Form = ({
  placeholder,
  btnTitle,
  handleCloseClick,
  list,
  setList,
  handleSubmit,
  task,
  setTask,
}: FormProps) => {
  return (
    <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit}>
      {list && (
        <input
          autoFocus
          placeholder={placeholder}
          value={list?.title}
          onChange={(e) => setList?.({ title: e.target.value })}
          className='pl-2 py-1 h-[32px] outline-[#1D7AFC] text-[14px] placeholder:text-light-navy'
        />
      )}
      {task && (
        <input
          autoFocus
          placeholder={placeholder}
          value={task?.description}
          onChange={(e) => setTask?.({ description: e.target.value })}
          className='pl-2 py-1 h-[32px] outline-[#1D7AFC] text-[14px] placeholder:text-light-navy rounded-[8px]'
        />
      )}
      <div className='flex flex-row gap-2'>
        <CustomButton
          title={btnTitle}
          containerStyles='bg-[#0c66e4] px-3 py-1.5 rounded-[4px] hover:bg-[#0055CC]'
          textStyles='text-white text-[14px]'
          btnType='submit'
        />
        <XMarkIcon
          className='w-[24px] fill-light-navy stroke-[0.2] stroke-light-navy cursor-pointer hover:fill-dark-navy'
          onClick={handleCloseClick}
        />
      </div>
    </form>
  );
};

export default Form;
