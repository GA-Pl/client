import React from 'react';
import Image from 'next/image';
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd';
import { IContentItem } from '@/types/content';

interface ContentItemProps {
  content: IContentItem;
  index: number;
  handleContentChange: (
    id: string,
    field: keyof IContentItem,
    value: string,
  ) => void;
  handleItemContentChange: (
    contentId: string,
    contentIndex: number,
    value: string,
  ) => void;
  deleteContent: (id: string) => void;
  deleteItemContent: (contentId: string, contentIndex: number) => void;
  setContents: React.Dispatch<React.SetStateAction<IContentItem[]>>;
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  addItemContent: (contentId: string) => void;
}

const ContentItem = ({
  content,
  index,
  handleContentChange,
  handleItemContentChange,
  deleteContent,
  deleteItemContent,
  addItemContent,
}: ContentItemProps) => {
  return (
    <Draggable key={content.id} draggableId={content.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          className={`mb-4 p-4 border border-slate-100 shadow-sm ${
            snapshot.isDragging ? 'bg-primary100' : ''
          }`}
        >
          {/* Header */}
          <div className={'flex justify-between'}>
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.dragHandleProps}
              className={'cursor-grab'}
            >
              <Image
                src={'/icons/linesSlate.png'}
                width={10}
                height={10}
                alt={'Drag Handle'}
                className={'p-1 w-6 h-6 opacity-50'}
              />
            </div>
            {index !== 0 && (
              <button
                type={'button'}
                onClick={() => deleteContent(content.id)}
                className={
                  'flex justify-center items-center rounded-full hover:bg-primary100 ml-auto p-1 w-8 h-8'
                }
              >
                <Image
                  src={'/icons/deletetrash.png'}
                  width={15}
                  height={15}
                  alt={'Delete'}
                />
              </button>
            )}
          </div>
          <div className={'flex items-center mb-2 relative'}>
            <label
              htmlFor={`subtitle-${index}`}
              className={
                'text-sm font-medium mr-2 w-8 h-8 rounded-full bg-primary100 text-slate-600 flex justify-center items-center'
              }
            >
              {index + 1}
            </label>
            <div className={'relative w-full'}>
              <input
                id={`subtitle-${index}`}
                value={content.subtitle}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    handleContentChange(content.id, 'subtitle', e.target.value);
                  }
                }}
                className={
                  'block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                }
                placeholder={'소제목을 입력하세요'}
              />
              <span
                className={'absolute top-[-3dvh] left-2 text-xs text-slate-300'}
              >
                {content.subtitle.length}
                {'/100'}
              </span>
            </div>
          </div>

          <Droppable droppableId={content.id} type={'nested'}>
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot,
            ) => (
              <div
                ref={provided.innerRef}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
                className={`p-2 ${
                  snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                {content?.contents?.map((item, contentIndex) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={contentIndex}
                  >
                    {(provided: DraggableProvided) => (
                      <div
                        ref={provided.innerRef}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...provided.draggableProps}
                        className={'flex items-center mb-2 relative'}
                      >
                        {content.contents.length > 1 && (
                          <button
                            type={'button'}
                            onClick={() =>
                              deleteItemContent(content.id, contentIndex)
                            }
                            className={'mr-2 text-red-400 hover:text-red-800'}
                          >
                            <Image
                              src={'/icons/deletecontent.png'}
                              width={12}
                              height={12}
                              alt={'Delete'}
                            />
                          </button>
                        )}
                        <div className={'relative w-full'}>
                          <textarea
                            value={item.text}
                            onChange={(e) => {
                              const transformedValue = e.target.value.replace(
                                /\n/g,
                                ' ',
                              );
                              if (transformedValue.length <= 255) {
                                handleItemContentChange(
                                  content.id,
                                  contentIndex,
                                  transformedValue,
                                );
                              }
                            }}
                            className={
                              'block w-full h-16 px-3 py-2 border mt-2 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                            }
                            rows={3}
                            placeholder={`교사발문 ${contentIndex + 1}`}
                          />
                          <span
                            className={
                              'absolute bottom-[-3dvh] right-2 text-xs text-slate-300'
                            }
                          >
                            {item.text.length}
                            {'/255'}
                          </span>
                        </div>
                        <div
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...provided.dragHandleProps}
                          className={'cursor-grab ml-1'}
                        >
                          <Image
                            src={'/icons/linesSlate.png'}
                            width={10}
                            height={10}
                            alt={'Drag Handle'}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Add New Item */}
          <button
            type={'button'}
            onClick={() => addItemContent(content.id)}
            className={
              'button-border py-2 px-4 bg-primary text-white text-lg rounded-full hover:bg-primary-dark hover:bg-white hover:text-primary mt-2 w-12 h-12 flex justify-center items-center mx-auto'
            }
          >
            {'+'}
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default ContentItem;
