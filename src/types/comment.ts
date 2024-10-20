export default interface IComment {
  id: number;
  author: string;
  text: string;
  likes: number;
  showReplies: boolean;
  replies?: IComment[];
  isLiked?: boolean;
}
