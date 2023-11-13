import { BaseEntity } from "../../../common/model";

export interface Request {
  userId: number;
  teacherId: number;
  comment: String;
}
export interface WithLikeCount extends BaseEntity, Request {
  displayName: string;
  likeCount: number;
  dislikeCount: number;
}

export interface ListWithTotal {
  total: number;
  list: WithLikeCount[];
}
