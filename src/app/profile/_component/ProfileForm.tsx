import { IProfileData } from '@/types/profile';
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProfileFormProps {
  profileData: IProfileData;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleImageChange: (imageSrc: string) => void;
}

const ProfileForm = ({
  profileData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
}: ProfileFormProps) => {
  const [imagePreview, setImagePreview] = useState(profileData.image);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
          handleImageChange(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col space-y-4'}>
      <h2 className={'font-semibold text-xl text-slate-700'}>
        {'프로필 수정하기'}
      </h2>
      <div className={'mt-2 grid grid-cols-10'}>
        <label
          htmlFor={'file-input'}
          className={'pt-8 col-span-3 cursor-pointer'}
        >
          <Image
            src={imagePreview}
            alt="Profile Picture"
            width={180}
            height={180}
            className={
              'block rounded-full w-20 h-20 object-cover hover:opacity-60'
            }
          />
          <div className={'mt-2 text-sm text-slate-800 hover:text-slate-500'}>
            {'이미지 변경'}
          </div>
        </label>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className={'col-span-7 ml-8 flex flex-col'}>
          <div className={'text-xs mb-1'}>{'이름'}</div>
          <input
            type={'text'}
            name={'name'}
            value={profileData.name}
            onChange={handleInputChange}
            placeholder={'Name'}
            className={
              'border-slate-500 border-2 p-1 rounded-md text-sm text-slate-500'
            }
          />
          <div className={'flex flex-col'}>
            <div className={'text-xs mb-1 mt-2'}>{'소개글'}</div>
            <textarea
              name={'introduction'}
              value={profileData.introduction}
              onChange={handleInputChange}
              placeholder={'Introduction'}
              className={
                'border-slate-500 border-2 p-1 rounded-md h-24 text-sm resize-none'
              }
              rows={4}
            />
          </div>
        </div>
      </div>
      <div className={'flex justify-center items-center'}>
        <button
          className={
            'flex justify-center items-center shadow-md w-32 h-8 rounded-md bg-primary text-white text-sm hover:bg-primary600'
          }
          type={'submit'}
        >
          {'저장하기'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
