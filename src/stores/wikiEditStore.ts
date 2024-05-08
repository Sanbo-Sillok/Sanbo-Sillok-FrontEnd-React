import { create } from 'zustand';

interface WikiEditStore {
  contents: string;
  setContents: (contents: string) => void;
}

const useWikiEditStore = create<WikiEditStore>((set) => ({
  contents: '',
  setContents: (contents: string) => set((state) => ({ ...state, contents })),
}));

export default useWikiEditStore;
