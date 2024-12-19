import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { IContentItem, ISubContentItem } from '@/types/content';
import { useSubjectStore } from '@/app/ai/_store/useSubjectStore';
import ContentItem from './ContentItem';

interface ContentSectionProps {
  contents: IContentItem[];
  setContents: React.Dispatch<React.SetStateAction<IContentItem[]>>;
}

const ContentSection = ({ contents, setContents }: ContentSectionProps) => {
  const { documentData } = useSubjectStore();
  const pathname = usePathname();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (contents.length === 0) {
      setContents([
        {
          id: uuidv4(),
          subtitle: '',
          contents: [{ id: uuidv4(), text: '' }],
        },
      ]);
    }
  }, [contents, setContents]);

  useEffect(() => {
    if (contents?.length === 0 && documentData && pathname === '/ai') {
      const loadedContents = documentData.data.activity_content.map((item) => ({
        id: uuidv4(),
        subtitle: item.subtitle,
        contents: item.content.split(/(?<=[.?])\s*/).map((text) => ({
          id: uuidv4(),
          text: text.trim(),
        })),
      }));
      setContents(loadedContents);
    }
  }, [documentData, pathname, setContents, contents]);

  const handleContentChange = (
    id: string,
    field: keyof IContentItem,
    value: string,
  ): void => {
    setContents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const handleItemContentChange = (
    contentId: string,
    contentIndex: number,
    value: string,
  ): void => {
    setContents((prev) =>
      prev.map((c) =>
        c.id === contentId
          ? {
              ...c,
              contents: c.contents?.map((item, idx) =>
                idx === contentIndex ? { ...item, text: value } : item,
              ),
            }
          : c,
      ),
    );
  };

  const addContent = () => {
    if (contents?.length < 10 && !isAdding) {
      setIsAdding(true);
      const newContent = {
        id: uuidv4(),
        subtitle: '',
        contents: [{ id: uuidv4(), text: '' }],
      };
      setContents((prevContents) => [...prevContents, newContent]);
      setIsAdding(false);
    }
  };

  const deleteContent = (id: string): void => {
    setContents((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteItemContent = (contentId: string, contentIndex: number): void => {
    setContents((prev) =>
      prev.map((c) =>
        c.id === contentId
          ? {
              ...c,
              contents: c.contents.filter((_, idx) => idx !== contentIndex),
            }
          : c,
      ),
    );
  };

  const addItemContent = (contentId: string): void => {
    setContents((prev) =>
      prev.map((c) =>
        c.id === contentId
          ? {
              ...c,
              contents: [...c.contents, { id: uuidv4(), text: '' }],
            }
          : c,
      ),
    );
  };

  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'top-level') {
        setContents((prevContents) =>
          reorder(prevContents, source.index, destination.index),
        );
      } else {
        const contentId = source.droppableId;
        setContents((prevContents) =>
          prevContents?.map(
            (content): IContentItem =>
              content.id === contentId
                ? {
                    ...content,
                    contents: reorder(
                      content?.contents?.map(
                        (subContent): ISubContentItem => ({
                          ...subContent,
                        }),
                      ),
                      source.index,
                      destination.index,
                    ),
                  }
                : content,
          ),
        );
      }
    }
  };

  return (
    <div>
      <h1 className={'title-effect'}>{'세부내용'}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'top-level'} type={'top-level'}>
          {(provided, snapshot) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={'p-4'}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? 'rgb(248 250 252)'
                  : 'white',
              }}
            >
              {contents?.map((content, index) => (
                <ContentItem
                  key={content.id}
                  content={content}
                  index={index}
                  handleContentChange={handleContentChange}
                  handleItemContentChange={handleItemContentChange}
                  deleteContent={deleteContent}
                  deleteItemContent={deleteItemContent}
                  addItemContent={addItemContent}
                  setContents={setContents}
                  isAdding={isAdding}
                  setIsAdding={setIsAdding}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={'flex justify-center mt-2'}>
        <button
          type={'button'}
          onClick={addContent}
          className={
            'button-border py-2 px-4 bg-primary text-white text-sm rounded-full hover:bg-primary-dark hover:bg-white hover:text-primary h-12 flex justify-center items-center'
          }
        >
          {'세부내용 추가'}
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
