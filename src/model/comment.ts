import { BaseEntity } from ".";

// Comment
export interface CommentRequest {
  userId: number;
  subjectId: number;
  comment: String;
}
export interface CommentWithLikeCount extends BaseEntity, CommentRequest {
  displayName: string;
  likeCount: number;
  dislikeCount: number;
}

// Comment React
export interface CommentReactEntity extends BaseEntity {
  userId: number;
  commentId: number;
  react: boolean;
}
