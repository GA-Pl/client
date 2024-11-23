import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { IDocumentData } from '@/types/document';
import { useAi } from '../../_lib/useAi';
import { useSubjectStore } from '../../_store/useSubjectStore';
import TypingEffect from '../motion/TypingEffect';

type DetailQuestionProps = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

type ISubjectItem = {
  subtitle: string;
  content: string;
};

const DetailQuestion = ({ setCurrentStep }: DetailQuestionProps) => {
  const { selectedAnswers, subjectData } = useSubjectStore();
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const { addDocument } = useAi(accessToken!, 1, 1);
  const [selectedSubtitle, setSelectedSubtitle] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOptionSelect = (item: ISubjectItem) => {
    setSelectedSubtitle(item.subtitle);
    setSelectedContent(item.content);
    setShowConfirmation(true);
  };

  const handleCreatePlan = () => {
    const documentData: IDocumentData = {
      ...selectedAnswers,
      selectedSubtitle,
      selectedContent,
    };
    addDocument(documentData);
    setShowConfirmation(false);
    setCurrentStep(6);
  };

  const personalizedMessage = `${selectedAnswers.age}세, ${selectedAnswers.groupSize}, ${selectedAnswers.subject}, ${selectedAnswers.activityType}를 기반으로 Gapple에서 다음과 같은 활동을 추천드려요`;

  const sentences = selectedContent.split(/(?<=[.?])\s*/).map((sentence) => (
    <li key={uuidv4()} style={{ marginBottom: '0.5em' }}>
      {sentence}
    </li>
  ));

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <TypingEffect text={personalizedMessage} />
      <div className={'mt-4'}>
        {subjectData &&
          subjectData.data.map((item) => (
            <button
              key={item.subtitle}
              type={'button'}
              className={`w-full p-2 text-left rounded mt-2 ${
                selectedSubtitle === item.subtitle
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              onClick={() => handleOptionSelect(item)}
            >
              <div>{item.subtitle}</div>
            </button>
          ))}
        {showConfirmation && (
          <>
            <ul
              className={'p-2 mt-2 bg-slate-100 rounded text-sm'}
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
                lineHeight: '1.6',
              }}
            >
              {sentences}
            </ul>
            <button
              type={'button'}
              className={
                'mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700'
              }
              onClick={handleCreatePlan}
            >
              {'교육계획안 생성'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailQuestion;
