import { LabelProps } from '@/types';

interface TooltipProps {
  label?: LabelProps;
  type: string;
  message?: string;
}

const Tooltip = ({ label, type, message }: TooltipProps) => {
  return (
    <>
      {type === 'label' ? (
        <div className='min-w-max text-[12px] text-white bg-light-navy rounded-[3px] px-1.5 py-[1px] absolute mt-2 hidden group-hover/label:flex'>
          {`Color: ${label?.color}, title: ${label?.title !== '' ? `"${label?.title}"` : 'none'}`}
        </div>
      ) : (
        <div className='min-w-max text-[12px] bg-white rounded-[3px] border border-black px-1.5 py-[2px] absolute hidden group-hover/due:flex mt-14 z-10 left-[60%]'>
          {message}
        </div>
      )}
    </>
  );
};

export default Tooltip;
