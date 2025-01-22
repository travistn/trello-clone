import { create } from 'zustand';

import { ListProps, UserProps } from '@/types';

interface ListState {
  lists: ListProps[];
  setLists: (lists: ListProps[]) => void;
}

const useListStore = create<ListState>()((set) => ({
  lists: [],
  setLists: (lists: ListProps[]) => set(() => ({ lists: lists })),
}));

interface UserState {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: {
    id: '',
    accountType: '',
  },
  setUser: (user: UserProps) => set(() => ({ user: user })),
}));

export default useListStore;
