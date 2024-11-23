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
          className={`mb-4 p-4 border border-slate-100 shadow-sm ${snapshot.isDragging ? 'bg-primary100' : ''}`}
        >
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

          <div className={'flex items-center mb-2'}>
            <label
              htmlFor={`subtitle-${index}`}
              className={
                'text-sm font-medium mr-2 w-8 h-8 rounded-full bg-primary100 text-slate-600 flex justify-center items-center'
              }
            >
              {index + 1}
            </label>
            <input
              id={`subtitle-${index}`}
              value={content.subtitle}
              onChange={(e) =>
                handleContentChange(content.id, 'subtitle', e.target.value)
              }
              className={
                'block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
              }
              placeholder={'소제목을 입력하세요'}
            />
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
                className={`p-2 ${snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-white'}`}
              >
                {content.contents.map((item, contentIndex) => (
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
                        className={'flex items-center mb-2'}
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
                              src={'/icons/deleteContent.png'}
                              width={12}
                              height={12}
                              alt={'Delete'}
                            />
                          </button>
                        )}

                        <textarea
                          value={item.text}
                          onChange={(e) =>
                            handleItemContentChange(
                              content.id,
                              contentIndex,
                              e.target.value,
                            )
                          }
                          className={
                            'block w-full h-16 px-3 py-2 border mt-2 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                          }
                          rows={3}
                          placeholder={`교사발문 ${contentIndex + 1}`}
                        />
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
