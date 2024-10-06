'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import fetchLessonDetail from '@/_lib/api/lesson/fetchLessonDetail';

export function useLessonData(documentId: string | number) {
  const { data: session } = useSession();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (session) {
        setLoading(true);
        try {
          const data = await fetchLessonDetail(documentId, session.accessToken);
          setLessonData(data);
        } catch (error) {
          console.error('Error fetching lesson:', error);
        }
        setLoading(false);
      }
    }

    loadData();
  }, [documentId, session]);

  return { lessonData, loading, isAuthenticated: !!session };
}
