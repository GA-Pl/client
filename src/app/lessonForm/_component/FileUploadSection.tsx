import Image from 'next/image';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  id: string;
  label: string;
  description?: string;
}

interface FileWithPreview {
  name: string;
  preview: string;
  size: number;
  type: string;
}

const FileUploadSection = ({ id, label, description }: FileUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      ]);
    },
  });

  const filePreviews = files.map((file) => (
    <div
      key={file.name}
      className={
        'mt-2 flex justify-between items-center bg-white p-2 rounded shadow'
      }
    >
      <span className={'text-sm text-gray-700'}>{file.name}</span>
      <button
        type={'button'}
        onClick={() =>
          setFiles((currentFiles) => currentFiles.filter((f) => f !== file))
        }
        className={'text-red-500 hover:text-red-700'}
      >
        <Image
          src={'/icons/deletetrash.png'}
          width={16}
          height={16}
          alt={'delete'}
        />
      </button>
    </div>
  ));

  return (
    <>
      <h1 className={'title-effect'}>{'활동 파일 업로드'}</h1>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className={
          'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary cursor-pointer'
        }
      >
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
          id={id}
          aria-label={label}
          aria-describedby={`${id}-description`}
          className={'bg-primary100 border-none'}
        />
        <p className={isDragActive ? 'text-primary' : 'text-gray-500'}>
          {isDragActive
            ? '파일을 여기에 드롭해주세요!'
            : description ||
              '클릭해서 파일을 업로드하거나 여기에 파일을 드롭해주세요!'}
        </p>
      </div>
      {filePreviews.length > 0 && (
        <div className={'mt-4'}>
          <Image
            src={'/icons/fileImport.png'}
            width={24}
            height={24}
            alt={'file'}
          />
          {filePreviews}
        </div>
      )}
    </>
  );
};

export default FileUploadSection;
