import { FormEventHandler, MouseEventHandler } from 'react';

export interface ListProps {
  title: string;
}

export interface ListCardProps {
  title: string;
}

export interface TaskCardProps {
  task: string;
}

export interface CustomButtonProps {
  title: string;
  btnType?: 'button' | 'submit';
  containerStyles?: string;
  textStyles?: string;
  plusIcon?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface FormProps {
  placeholder: string;
  btnTitle: string;
  handleCloseClick?: MouseEventHandler<SVGSVGElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  list?: ListProps;
  setList?: (list: ListProps) => void;
}
