'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

interface PreviewFile extends File {
  preview: string;
}

const PhotoUpload = () => {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: PreviewFile[] = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setFiles((prevFiles) => [
      ...prevFiles,
      ...newFiles.slice(0, 5 - prevFiles.length),
    ]);
  }, []);

  const onDropRejected = useCallback((fileRejections: string | any[]) => {
    if (fileRejections.length > 0) {
      toast.error(`최대 5개의 파일만 업로드가 가능합니다!`);
    }
  }, []);

  const removeFile = (fileToRemove: PreviewFile) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file !== fileToRemove),
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: 'image/*' as any,
    maxFiles: 5,
    maxSize: 1048576,
  });

  return (
    <div className={'container mx-auto px-4'}>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className={
          'flex flex-col w-72 p-4 bg-white border-2 border-dashed border-primary items-center justify-center text-primary cursor-pointer mb-4'
        }
      >
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
        />
        {isDragActive ? (
          <p>{'파일을 여기에 드랍해주세요! '}</p>
        ) : (
          <p>{'이곳에 파일을 드랍하거나 클릭해주세요!'}</p>
        )}
        <Image
          src={'/icons/fileImport.png'}
          width={32}
          height={32}
          alt={'fileImg'}
          className={'mt-4'}
        />
        <div className={'mt-4 text-sm'}>{'(최대 5개)'}</div>
        <div
          className={
            'grid grid-cols-3 border-t-2 border-t-primary200 gap-2 mt-4 pt-4'
          }
        >
          {files.map((file, index) => (
            <div key={uuidv4()} className={'relative'}>
              <Image
                src={file.preview}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                className={'object-contain'}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
              <button
                type={'button'}
                onClick={() => removeFile(file)}
                className={'absolute top-0 right-0 bg-red-500 text-white p-1'}
              >
                {'✕'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      {/* {files.length > 0 && <ImageSwiper files={files} />} */}
    </div>
  );
};

export default PhotoUpload;
