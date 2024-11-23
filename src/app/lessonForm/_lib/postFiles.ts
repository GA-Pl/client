import axios from 'axios';
import { BASE_NEXT_URL } from '@/_lib/utils/config';

const postFiles = async (formData: FormData, accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(
      `${BASE_NEXT_URL}/api/document/postFile`,
      formData,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

export default postFiles;
