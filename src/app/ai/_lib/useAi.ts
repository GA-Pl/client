import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IDocumentData } from '@/types/document';
import { ISelectedAnswers } from '@/types/aiOption';
import { postSubject } from './subjectApi';
import { postDocument } from './documentApi';
import { useSubjectStore } from '../_store/useSubjectStore';

export function useAi(
  accessToken: string,
  subjectId: number,
  documentId: number,
) {
  const queryClient = useQueryClient();

  const postSubjectMutation = useMutation(
    (subjectData: ISelectedAnswers) => postSubject(subjectData, accessToken),

    {
      onSuccess: (data) => {
        const { setSubjectData } = useSubjectStore.getState();
        setSubjectData(data);
        queryClient.invalidateQueries(['subject', subjectId]);
      },
      onError: (error) => {
        console.error('Error posting subject:', error);
      },
    },
  );
  const postDocumentMutation = useMutation(
    (documentData: IDocumentData) => postDocument(documentData, accessToken),
    {
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),

      onSuccess: (data) => {
        const { setDocumentData } = useSubjectStore.getState();
        setDocumentData(data);
        queryClient.invalidateQueries(['document', documentId]);
      },

      onError: (error) => {
        console.error('Error posting document:', error);
      },
    },
  );

  return {
    addSubject: postSubjectMutation.mutate,
    addDocument: postDocumentMutation.mutate,
    subjectMutationState: postSubjectMutation,
    documentMutationState: postDocumentMutation,
  };
}
