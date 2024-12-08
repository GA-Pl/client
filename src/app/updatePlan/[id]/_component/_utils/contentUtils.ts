import { v4 as uuidv4 } from 'uuid';
import { IContentItem } from '@/types/content';

export const transformActivityContent = (
  activityContent: { subtitle: string; content?: string }[],
): IContentItem[] => {
  return activityContent.map((item) => ({
    id: uuidv4(),
    subtitle: item.subtitle || '',
    contents: (item.content || '')
      .split('\n')
      .filter((text) => text.trim())
      .map((text) => ({
        id: uuidv4(),
        text: text.trim(),
      })),
  }));
};
