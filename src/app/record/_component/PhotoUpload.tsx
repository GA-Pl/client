'use client';

import React, { useState, ChangeEvent } from 'react';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className={'flex flex-col items-center mb-6'}>
      <label
        htmlFor={'photo-upload'}
        className={
          'w-64 h-64 border-2 border-dashed border-primary flex items-center justify-center text-red-500 cursor-pointer'
        }
      >
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt={'Selected'}
            className={'object-cover w-full h-full'}
          />
        ) : (
          <div className={'text-center'}>
            <span className={'text-2xl'}>{'+'}</span>
            <p className={'text-sm'}>{'사진'}</p>
          </div>
        )}
      </label>
      <input
        type={'file'}
        id={'photo-upload'}
        className={'hidden'}
        accept={'image/*'}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PhotoUpload;
