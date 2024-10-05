import React from 'react';
import { TextAreaInput } from './TextAreaInput';
import { BaseInput } from './BaseInput';

interface ContentItem {
  subtitle: string;
  content: string;
}

interface ContentSectionProps {
  contents: ContentItem[];
  handleContentsChange: (
    index: number,
    field: 'subtitle' | 'content',
    value: string,
  ) => void;
  addContent: () => void;
}

const ContentSection = ({
  contents,
  handleContentsChange,
  addContent,
}: ContentSectionProps) => {
  return (
    <div>
      <h1 className={'title-effect mb-4'}>{'세부 내용'}</h1>
      {contents.map((content, index) => (
        <div key={`세부내용 ${index + 1}`} className={'flex flex-col mt-4'}>
          <div
            className={
              'flex justify-between text-lg text-slate-700 border-b mt-2'
            }
          >
            {`세부내용 ${index + 1}`}
          </div>
          <BaseInput
            label={`소제목 ${index + 1}`}
            id={`subtitle-${index}`}
            value={content.subtitle}
            onChange={(value: string) =>
              handleContentsChange(index, 'subtitle', value)
            }
          />
          <TextAreaInput
            label={`세부내용 ${index + 1}`}
            id={`content-${index}`}
            value={content.content}
            onChange={(value) => handleContentsChange(index, 'content', value)}
          />
        </div>
      ))}
      <div className={'flex justify-center mt-2'}>
        <button
          type={'button'}
          onClick={addContent}
          className={
            'flex justify-center items-center button-border py-2 px-4 bg-primary text-white text-lg rounded-full hover:bg-primary-dark button-effect hover:bg-white hover:text-primary w-12 h-12'
          }
        >
          {'+'}
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
