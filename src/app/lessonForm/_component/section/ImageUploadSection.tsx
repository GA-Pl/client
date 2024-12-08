import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import postFiles from '../../_lib/postFiles';

interface ImageUploadProps {
  initialImageUrls?: string[];
  imageId: number;
  setImageId: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  label: string;
  description?: string;
  accessToken: string;
}

interface ImageWithPreview {
  name: string;
  preview: string;
  size: number;
  type: string;
  file: File;
}

const ImageUploadSection = ({
  initialImageUrls = [],
  setImageId,
  id,
  label,
  description,
  accessToken,
}: ImageUploadProps) => {
  const [images, setImages] = useState<ImageWithPreview[]>([]);

  const convertUrlToFile = async (
    url: string,
    fileName: string,
  ): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  useEffect(() => {
    const loadInitialImages = async () => {
      try {
        // `initialImageUrls` 배열의 모든 URL을 비동기적으로 처리
        const imagePromises = initialImageUrls.map((url) =>
          convertUrlToFile(url, url.split('/').pop() || 'unknown').then(
            (file) => ({
              name: file.name,
              preview: URL.createObjectURL(file),
              size: file.size,
              type: file.type,
              file,
            }),
          ),
        );

        const preloadedImages = await Promise.all(imagePromises);

        setImages((prevImages) => {
          const existingNames = new Set(prevImages.map((img) => img.name));
          const uniqueImages = preloadedImages.filter(
            (img) => !existingNames.has(img.name),
          );
          return [...prevImages, ...uniqueImages];
        });
      } catch (error) {
        console.error('Failed to load initial images:', error);
      }
    };

    if (initialImageUrls.length > 0) {
      loadInitialImages();
    }
  }, [initialImageUrls]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach(({ file }) => formData.append('files', file));

      postFiles(formData, accessToken)
        .then((response) => {
          setImageId(response.data);
        })
        .catch((error) => {
          console.error('Upload error:', error);
        });
    }
  }, [images, accessToken, setImageId]);

  const handleDelete = (imageToDelete: ImageWithPreview) => {
    setImages((currentImages) =>
      currentImages.filter((image) => image !== imageToDelete),
    );
    URL.revokeObjectURL(imageToDelete.preview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const imagePreviews = images.map((image) => (
    <div
      key={image.name}
      className={
        'mt-2 flex justify-between items-center bg-white p-2 rounded shadow w-36'
      }
    >
      <div className={'relative w-24 h-24'}>
        <Image
          src={image.preview}
          alt={image.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          width={100}
          height={100}
        />
      </div>
      <button
        type={'button'}
        onClick={() => handleDelete(image)}
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
          'flex justify-center items-center mt-1 w-full px-3 py-12 border-2 border-primary500 hover:bg-primary100 rounded-md shadow-sm focus:outline-none focus:ring-primary200 focus:bg-primary100 cursor-pointer'
        }
      >
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
          id={id}
          aria-label={label}
          aria-describedby={`${id}-description`}
          className={'bg-pink-100 border-none'}
        />
        <Image
          src={'/icons/imagePink.png'}
          width={45}
          height={45}
          alt={'image'}
          className={'mr-2'}
        />
        <p className={isDragActive ? 'text-primary700' : 'text-slate-700'}>
          {isDragActive
            ? '이미지를 여기에 드롭해주세요!'
            : description ||
              '클릭해서 이미지를 업로드하거나 여기에 이미지를 드롭해주세요!'}
        </p>
      </div>
      {imagePreviews.length > 0 && (
        <div
          className={
            'mt-4 grid grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-5'
          }
        >
          {imagePreviews}
        </div>
      )}
    </>
  );
};

export default ImageUploadSection;
