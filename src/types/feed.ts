import IComment from './comment';

export interface IFeed {
  id: number;
  age: number;
  type: string;
  authorNickname: string;
  authorId: number;
  authorThumbnailImage: string;
  createdAt: string;
  title: string;
  subject: string;
  activity_type: string;
  images: string[];
  content_subtitles: string[];
  content: string | null;
  liked: boolean;
  liked_count: number;
  bookmarked: boolean;
  bookmark_count: number;
  comments: IComment[];
  activity_goal: string;
}
