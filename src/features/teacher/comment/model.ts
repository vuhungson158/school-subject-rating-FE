import { BaseResponseModel } from "../../../model/commonModel";

export interface Request {
  userId: number;
  teacherId: number;
  comment: String;
}
export interface WithLikeCount extends BaseResponseModel, Request {
  displayName: string;
  likeCount: number;
  dislikeCount: number;
}

export interface ListWithTotal {
  total: number;
  list: WithLikeCount[];
}
