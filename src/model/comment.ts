import { BaseEntity, RefTable } from ".";

export interface CommentEntity extends BaseEntity {
  userId: number;
  refId: number;
  comment: string;
  refTable: RefTable;
  dob: Date;
}

export interface CommentWithLikeCount extends CommentEntity {
  likeCount: number;
  dislikeCount: number;
}

export interface CommentRatingEntity extends BaseEntity {
  userId: number;
  commentId: number;
  react: boolean;
}