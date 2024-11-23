import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import postFiles from '../../_lib/postFiles';

interface FileUploadProps {
  fileId: number;
  setFileId: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  label: string;
  description?: string;
  accessToken: string;
}

interface FileWithPreview {
  id: string;
  name: string;
  preview: string;
  size: number;
  type: string;
  file: File;
}

const FileUploadSection = ({
  setFileId,
  id,
  label,
  description,
  accessToken,
}: FileUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: uuidv4(),
      name: file.name,
      preview: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach(({ file }) => formData.append('files', file));

      postFiles(formData, accessToken)
        .then((response) => {
          console.log('Upload success:', response);
          setFileId(response.data);
        })
        .catch((error) => {
          console.error('Upload error:', error);
        });
    }
  }, [files, accessToken, setFileId]);

  const handleDelete = (fileToDelete: FileWithPreview) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.id !== fileToDelete.id),
    );
    URL.revokeObjectURL(fileToDelete.preview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const filePreviews = files.map((file) => (
    <div
      key={file.id}
      className={
        'mt-2 flex justify-between items-center bg-white p-2 rounded shadow'
      }
    >
      <span className={'text-sm text-slate-700'}>{file.name}</span>
      <button
        type={'button'}
        onClick={() => handleDelete(file)}
        className={'text-red-500 hover:text-red-700'}
      >
        <Image
          src={'/icons/deletetrash.png'}
          width={16}
          height={16}
          alt={'Delete'}
        />
      </button>
    </div>
  ));

  return (
    <>
      <h1 className={'title-effect'}>{label}</h1>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className={
          'mt-1 block w-full px-3 py-2 border-dashed border-2 border-primary300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary cursor-pointer'
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
        <p className={isDragActive ? 'text-primary' : 'text-slate-400'}>
          {isDragActive
            ? '파일을 여기에 드롭해주세요!'
            : description ||
              '클릭해서 파일을 업로드하거나 여기에 파일을 드롭해주세요!'}
        </p>
      </div>
      {filePreviews.length > 0 && <div className={'mt-4'}>{filePreviews}</div>}
    </>
  );
};

export default FileUploadSection;
