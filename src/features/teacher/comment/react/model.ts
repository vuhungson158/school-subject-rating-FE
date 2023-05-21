import { BaseEntity } from "../../../common/model";

export interface Request {
  userId: number;
  commentId: number;
  react: boolean;
}
export interface Entity extends Request, BaseEntity {}
