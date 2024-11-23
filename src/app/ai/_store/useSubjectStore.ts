import { create } from 'zustand';
import { ISelectedAnswers, ISubjectData } from '@/types/aiOption';
import { IDocument } from '@/types/document';

interface SubjectStore {
  subjectData: ISubjectData | null;
  documentData: IDocument | null;
  setSubjectData: (data: ISubjectData | null) => void;
  setDocumentData: (data: IDocument | null) => void;

  selectedAnswers: ISelectedAnswers;
  setSelectedAnswers: (answers: ISelectedAnswers) => void;
  updateSelectedAnswer: (field: keyof ISelectedAnswers, value: any) => void;

  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useSubjectStore = create<SubjectStore>((set) => ({
  subjectData: null,
  documentData: null,
  setSubjectData: (data) => set({ subjectData: data }),
  setDocumentData: (data) => set({ documentData: data }),
  selectedAnswers: {
    age: 0,
    groupSize: '',
    subject: '',
    activityType: '',
  },

  setSelectedAnswers: (answers) => set({ selectedAnswers: answers }),
  updateSelectedAnswer: (field, value) =>
    set((state) => ({
      selectedAnswers: { ...state.selectedAnswers, [field]: value },
    })),

  loading: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
}));
