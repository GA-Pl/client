import { IOption } from '@/types/aiOption';

export const groupSize: IOption[] = [
  {
    name: '소집단 (5명 이하)',
    value: '소집단',
    image: '/images/group/small.png',
  },
  {
    name: '중집단 (5명 ~ 10명)',
    value: '중집단',
    image: '/images/group/medium.png',
  },
  {
    name: '대집단 (10명 이상)',
    value: '대집단',
    image: '/images/group/large.png',
  },
];
