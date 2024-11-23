import axios from 'axios';
import { ISelectedAnswers, ISubjectData } from '@/types/aiOption';

export async function postSubject(
  subjectData: ISelectedAnswers,
  accessToken: string,
): Promise<ISubjectData> {
  try {
    const response = await axios.post('/api/ai/aiSubject', subjectData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error posting subject:', error);
    throw error;
  }
}
