import axios from 'axios';
import { IDocumentData } from '@/types/document';
import { BASE_NEXT_URL } from '@/_lib/utils/config';

export async function postDocument(
  documentData: IDocumentData,
  accessToken: string,
) {
  try {
    const response = await axios.post(
      `${BASE_NEXT_URL}/api/ai/aiPlan`,
      documentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error posting document:', error);
    throw error;
  }
}
