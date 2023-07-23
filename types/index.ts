import { FormEventHandler, MouseEventHandler } from 'react';

export interface ListProps {
  title: string;
  _id?: string;
  tasks?: TaskProps[];
}

export interface TaskProps {
  description: string;
  _id?: string;
  list?: string;
}

export interface CustomButtonProps {
  title: string;
  btnType?: 'button' | 'submit';
  containerStyles?: string;
  textStyles?: string;
  plusIcon?: boolean;
  plusIconStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface FormProps {
  placeholder: string;
  btnTitle: string;
  handleCloseClick?: MouseEventHandler<SVGSVGElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  list?: ListProps;
  setList?: (list: ListProps) => void;
  task?: TaskProps;
  setTask?: (task: TaskProps) => void;
  setToggle?: ((toggle: boolean) => void) | undefined;
}
