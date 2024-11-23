'use client';

import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import postFiles from '@/app/lessonForm/_lib/postFiles';
import { IProfileData, PutProfileParams } from '@/types/profile';

interface ProfileFormProps {
  profileData: IProfileData;
  updateUserInfo: (
    data: PutProfileParams,
    callbacks: { onSuccess?: () => void; onError?: (error: any) => void },
  ) => void;
  setModalIsOpen: (isOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  accessToken: string;
  loading: boolean;
}

const ProfileForm = ({
  profileData,
  updateUserInfo,
  setModalIsOpen,
  accessToken,
  setLoading,
  loading,
}: ProfileFormProps) => {
  const [formData, setFormData] = useState<PutProfileParams>({
    nickname: profileData.nickname,
    selfIntro: profileData.selfIntro,
    image_file_id: undefined,
  });

  const [imagePreview, setImagePreview] = useState(
    profileData.profileImg || '/default-profile.jpg',
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast.error('하나의 이미지만 업로드할 수 있습니다.');
        return;
      }

      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const formData = new FormData();
      formData.append('files', file);

      postFiles(formData, accessToken)
        .then((response) => {
          if (response.data) {
            setFormData((prev) => ({
              ...prev,
              image_file_id: response.data,
            }));
          }
        })
        .catch((error) => {
          console.error('Failed to upload file:', error);
        });
    },
    [accessToken],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const payload: Partial<PutProfileParams> = { ...formData };

    if (payload.image_file_id === undefined) {
      delete payload.image_file_id;
    }

    try {
      await updateUserInfo(payload, {
        onSuccess: () => {
          toast.success('프로필 업데이트에 성공했습니다!');
          setModalIsOpen(false);
        },
        onError: (error) => {
          toast.error('프로필 업데이트에 실패했습니다.');
          console.error('Failed to update profile:', error);
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col space-y-4 p-6'}>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className={`flex justify-center items-center cursor-pointer ${isDragActive ? 'bg-slate-700 text-white' : 'bg-white'}`}
      >
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
          id={'file-input'}
          type={'file'}
          style={{ display: 'none' }}
        />
        <div className={'relative w-36 h-36 mb-4 rounded-full'}>
          <Image
            src={imagePreview}
            alt={'Profile Picture'}
            width={150}
            height={150}
            className={'rounded-full object-cover shadow-md'}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '100%',
            }}
          />
          <div
            className={
              'absolute bottom-0 right-0 bg-slate-300 bg-opacity-70 text-white rounded-full p-1 text-xs cursor-pointer'
            }
          >
            <Image
              src={'/icons/pencil.png'}
              height={20}
              width={20}
              alt={'Edit Icon'}
            />
          </div>
        </div>
      </div>
      <div className={'flex flex-col space-y-2 laptop:text-base text-sm'}>
        <div className={'grid grid-cols-[25%_70%] items-center'}>
          <label
            htmlFor={'name'}
            className={'text-sm text-slate-500 flex-nowrap'}
          >
            {'이름'}
          </label>
          <input
            id={'name'}
            type={'text'}
            name={'nickname'}
            value={formData.nickname}
            onChange={handleInputChange}
            placeholder={'이름'}
            className={
              'p-2 rounded-md bg-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary500 text-slate-600'
            }
          />
        </div>
        <div className={'grid grid-cols-[25%_75%] items-center'}>
          <label
            htmlFor={'introduction'}
            className={'text-sm text-slate-500 flex-nowrap mb-auto'}
          >
            {'소개글'}
          </label>
          <textarea
            id={'introduction'}
            name={'selfIntro'}
            value={formData.selfIntro}
            onChange={handleInputChange}
            placeholder={'소개글'}
            className={
              'p-2 rounded-md bg-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary500 text-slate-600'
            }
            rows={4}
          />
        </div>
      </div>
      <div className={'flex justify-center mt-4'}>
        <button
          type={'submit'}
          disabled={loading}
          className={
            'bg-primary700 hover:bg-primary text-white py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-200 text-sm'
          }
        >
          {loading ? '저장중...' : '저장하기'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
