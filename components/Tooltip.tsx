import { LabelProps } from '@/types';

interface TooltipProps {
  label: LabelProps;
}

const Tooltip = ({ label }: TooltipProps) => {
  return (
    <div className='text-[12px] text-white bg-light-navy rounded-[3px] px-1.5 py-[1px] absolute mt-2 transition-all duration-300 ease-in opacity-0 group-hover/label:opacity-100'>
      {`Color: ${label.color}, title: ${label.title !== '' ? `"${label.title}"` : 'none'}`}
    </div>
  );
};

export default Tooltip;
