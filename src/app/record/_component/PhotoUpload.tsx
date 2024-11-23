'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import postFiles from '@/app/lessonForm/_lib/postFiles';
import ImagePreview from './ImagePreview';
import { usePhotoStore } from '../_store/usePhotoStore';
import { useRecordStore } from '../_store/useRecordStore';
import Spinner from './Spinner';

interface PhotoUploadProps {
  onNext: () => void;
  accessToken: string;
}

interface ImageWithPreview {
  id: string;
  name: string;
  preview: string;
  size: number;
  type: string;
  file: File;
}

const PhotoUpload = ({ onNext, accessToken }: PhotoUploadProps) => {
  const { addPhotos, removePhoto, setPhotos, photos } = usePhotoStore(
    (state) => ({
      photos: state.photos,
      addPhotos: state.addPhotos,
      removePhoto: state.removePhoto,
      setPhotos: state.setPhotos,
    }),
  );
  const { setAttachmentId } = useRecordStore();
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: ImageWithPreview[] = [];
      let invalidFileType = false;

      acceptedFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          newImages.push({
            id: uuidv4(),
            name: file.name,
            preview: URL.createObjectURL(file),
            size: file.size,
            type: file.type,
            file,
          });
        } else {
          invalidFileType = true;
        }
      });

      if (invalidFileType) {
        toast.error('이미지 파일만 업로드가 가능합니다.');
      }

      const potentialTotal = photos.length + newImages.length;
      if (potentialTotal > 5) {
        toast.error(`최대 5개의 파일만 업로드가 가능합니다!`);
        return;
      }

      addPhotos(newImages);
    },
    [addPhotos, photos.length],
  );

  const onDropRejected = useCallback((fileRejections: any[]) => {
    fileRejections.forEach((rejection) => {
      rejection.errors.forEach((error: { code: string }) => {
        if (error.code === 'file-too-large') {
          toast.error('파일의 크기가 너무 큽니다.');
        } else if (error.code === 'too-many-files') {
          toast.error('파일의 갯수는 5개까지만 가능합니다.');
        } else if (error.code === 'file-invalid-type') {
          toast.error('이미지 파일만 가능합니다.');
        }
      });
    });
  }, []);

  const removeImage = (imageId: string) => {
    removePhoto(imageId);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const formData = new FormData();
  photos.forEach((photo) => {
    formData.append('files', photo.file);
  });

  const handleNext = async () => {
    setIsLoading(true);

    try {
      const data = await postFiles(formData, accessToken);
      if (data && data.data) {
        setAttachmentId(data.data);
        onNext();
      }
    } catch (error) {
      toast.error('Failed to upload files. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'flex flex-col items-center px-4'}>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className={
          'flex flex-col p-4 bg-white border-2 border-dashed border-primary items-center justify-center text-primary cursor-pointer mb-4 w-full laptop:w-[28rem] desktop:w-[35rem] mx-auto laptop:h-72 h-100'
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
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'photos'} direction={'horizontal'}>
          {(provided) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={'grid laptop:grid-cols-5 grid-cols-3 gap-2 mt-4 pt-4'}
            >
              {photos.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.draggableProps}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.dragHandleProps}
                    >
                      <ImagePreview
                        src={image.preview}
                        alt={`Preview of ${image.name}`}
                        onRemove={() => removeImage(image.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {photos.length >= 1 && (
        <button
          type={'button'}
          className={
            'ml-auto bg-blue-400 px-4 py-1 text-slate-50 rounded-sm hover:bg-blue-600'
          }
          onClick={handleNext}
        >
          {isLoading ? <Spinner /> : '다음'}
        </button>
      )}
    </div>
  );
};

export default PhotoUpload;
