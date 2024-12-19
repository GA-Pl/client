'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import deletePlanner from '@/app/lessonDetail/_lib/deletePlanner';
import { toast } from 'react-toastify';
import { getDrafts } from '../_lib/getDrafts';
import 'react-toastify/dist/ReactToastify.css';

interface Draft {
  id: number;
  title: string;
  subject?: string;
  activity_type?: string;
  activity_goal?: string;
  createdAt: string;
}

export default function DraftList() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const accessToken = session?.accessToken;

  const { data, isLoading, error } = useQuery(
    ['drafts', accessToken],
    () => {
      if (!accessToken) throw new Error('No access token');
      return getDrafts(session.accessToken);
    },
    {
      enabled: !!session,
      retry: false,
    },
  );

  const deleteMutation = useMutation(
    (id: number) => deletePlanner(id, accessToken!),
    {
      onSuccess: () => {
        toast.success('삭제되었습니다.');
        queryClient.invalidateQueries(['drafts', accessToken]);
      },
      onError: () => {
        toast.error('삭제에 실패했습니다.');
      },
    },
  );

  const handleDelete = (id: number) => {
    toast.warn(
      <div>
        <p>{'정말로 삭제하시겠습니까?'}</p>
        <div className={'flex justify-end gap-2'}>
          <button
            type={'button'}
            className={'text-red-500 underline'}
            onClick={() => {
              toast.dismiss();
              deleteMutation.mutate(id);
            }}
          >
            {'삭제'}
          </button>
          <button
            type={'button'}
            className={'text-slate-600 underline'}
            onClick={() => toast.dismiss()}
          >
            {'취소'}
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      },
    );
  };

  if (isLoading) {
    return <div className={'text-center text-slate-500'}>{'Loading...'}</div>;
  }

  if (error) {
    return (
      <div className={'text-center text-red-500'}>
        {'Error loading drafts.'}
      </div>
    );
  }

  if (!data || data.list?.length === 0) {
    return (
      <div className={'text-center text-slate-500'}>{'No drafts found.'}</div>
    );
  }

  return (
    <div className={'space-y-4'}>
      {data.data.list?.map((draft: Draft) => (
        <div key={draft.id} className={'border-b pb-4'}>
          <Link
            href={`/drafts/${draft.id}`}
            className={'block hover:bg-slate-100 transition-colors p-2'}
          >
            <h2 className={'text-lg font-semibold text-slate-500'}>
              {draft.title}
            </h2>
            <div className={'flex flex-col'}>
              {draft.subject ? (
                <div className={'text-slate-800 text-sm mt-2'}>
                  {draft.subject}
                </div>
              ) : null}
              {draft.activity_type ? (
                <div className={'text-slate-600 text-sm mt-1'}>
                  {draft.activity_type}
                </div>
              ) : null}
              {draft.activity_goal ? (
                <div className={'text-slate-600 text-sm mt-1'}>
                  {draft.activity_goal}
                </div>
              ) : null}
            </div>
            <div className={'text-slate-400 text-xs mt-1'}>
              {new Date(draft.createdAt).toLocaleDateString()}
            </div>
          </Link>
          <button
            type={'button'}
            className={'text-red-600 text-sm hover:text-red-400 mt-2 pl-2'}
            onClick={() => handleDelete(draft.id)}
          >
            {'삭제'}
          </button>
        </div>
      ))}
    </div>
  );
}
