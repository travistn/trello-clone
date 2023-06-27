import { PlusIcon } from '@heroicons/react/24/solid';

import { CustomButtonProps } from '@/types';

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  btnType,
  plusIcon,
  handleClick,
}: CustomButtonProps) => {
  return (
    <button type={btnType} className={`${containerStyles}`} onClick={handleClick}>
      <span className={`flex flex-row items-center gap-1 ${textStyles}`}>
        {plusIcon && <PlusIcon className='w-[16px] fill-white stroke-1 stroke-white' />}
        {title}
      </span>
    </button>
  );
};

export default CustomButton;
