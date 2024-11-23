import { create } from 'zustand';

interface RecordStoreState {
  attachmentId: number | null;
  category: string;
  subject: string;
  content: string;
  setAttachmentId: (id: number) => void;
  setCategory: (category: string) => void;
  setSubject: (subject: string) => void;
  setContent: (content: string) => void;
  reset: () => void;
}

export const useRecordStore = create<RecordStoreState>((set) => ({
  attachmentId: null,
  category: '',
  subject: '',
  content: '',
  setAttachmentId: (id) => set({ attachmentId: id }),
  setCategory: (category) => set({ category }),
  setSubject: (subject) => set({ subject }),
  setContent: (content) => set({ content }),
  reset: () =>
    set({ attachmentId: null, category: '', subject: '', content: '' }),
}));
