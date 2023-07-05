import { PlusIcon } from '@heroicons/react/24/solid';

import { CustomButtonProps } from '@/types';

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  btnType,
  plusIcon,
  plusIconStyles,
  handleClick,
}: CustomButtonProps) => {
  return (
    <button type={btnType} className={`${containerStyles}`} onClick={handleClick}>
      <span className={`flex flex-row items-center gap-1.5 ${textStyles}`}>
        {plusIcon && <PlusIcon className={`w-[16px] ${plusIconStyles}`} />}
        {title}
      </span>
    </button>
  );
};

export default CustomButton;
