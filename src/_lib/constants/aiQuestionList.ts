import { IQuestion } from '@/types/aiOption';
import { age } from './age';
import { category } from './category';
import { groupSize } from './groupSize';
import { theme } from './theme';

export const ageQuestion: IQuestion = {
  question: '몇 세를 대상으로 한 수업인가요?',
  options: age,
  field: 'age',
};

export const groupSizeQuestion: IQuestion = {
  question: '집단의 크기는 어느 정도로 예상하시나요?',
  options: groupSize,
  field: 'groupSize',
};

export const subjectQuestion: IQuestion = {
  question: '어떠한 주제를 생각하고 계신가요?',
  options: theme,
  field: 'subject',
};

export const activityTypeQuestion: IQuestion = {
  question: '어떠한 활동 유형을 생각하고 계신가요?',
  options: category,
  field: 'activityType',
};
