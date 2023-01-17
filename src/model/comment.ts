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

export interface CommentListWithTotal {
  total: number;
  list: CommentWithLikeCount[];
}

// Comment React
export interface CommentReactRequest {
  userId: number;
  commentId: number;
  react: boolean;
}
export interface CommentReactEntity extends CommentReactRequest, BaseEntity {}
