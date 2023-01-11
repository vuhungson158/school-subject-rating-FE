import { BaseEntity } from ".";

// Comment
interface CommentEntity {
  userId: number;
  subjectId: number;
  comment: String;
}
export interface CommentRequest extends CommentEntity {}
export interface CommentWithLikeCount extends CommentEntity {
  name: string;
  likeCount: number;
  dislikeCount: number;
}

// Comment React
export interface CommentReactEntity extends BaseEntity {
  userId: number;
  commentId: number;
  react: boolean;
}
