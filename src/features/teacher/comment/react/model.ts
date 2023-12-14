import { BaseResponseModel } from "../../../../model/commonModel";

export interface Request {
  userId: number;
  commentId: number;
  react: boolean;
}
export interface Entity extends Request, BaseResponseModel {}
