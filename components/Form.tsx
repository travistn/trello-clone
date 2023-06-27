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
}: FormProps) => {
  return (
    <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit}>
      <input
        autoFocus
        placeholder={placeholder}
        value={list?.title}
        onChange={(e) => setList?.({ title: e.target.value })}
        className={`pl-2 py-1 h-[32px] outline-[#1D7AFC] text-[14px] placeholder:text-light-navy`}
      />
      <div className='flex flex-row gap-2'>
        <CustomButton
          title={btnTitle}
          containerStyles='bg-[#0c66e4] px-3 py-1.5 rounded-md hover:bg-[#0055CC]'
          textStyles='text-white text-[14px]'
          btnType='submit'
        />
        <XMarkIcon
          className='w-[24px] fill-light-navy stroke-[0.2] stroke-light-navy cursor-pointer'
          onClick={handleCloseClick}
        />
      </div>
    </form>
  );
};

export default Form;
