export default interface IComment {
  likedCount: number;
  isLiked: boolean;
  id: number;
  authorNickname: string;
  content: string;
  likes: number;
  replies: IComment[];
  showReplies: boolean;
  createdAt: string;
  parentCommentId: number | null;
  authorThumbnailImage?: string;
  isMyComment?: boolean;
}
