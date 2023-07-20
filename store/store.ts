import { create } from 'zustand';

import { ListProps } from '@/types';

interface ListState {
  lists: ListProps[];
  setLists: (lists: ListProps[]) => void;
}

const useListStore = create<ListState>()((set) => ({
  lists: [],
  setLists: (lists: ListProps[]) => set(() => ({ lists: lists })),
}));

export default useListStore;
