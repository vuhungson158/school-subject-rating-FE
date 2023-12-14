import { BaseResponseModel } from "../../../model/commonModel";

export interface Request {
  fromId: number;
  toId: number;
}

interface Entity extends Request, BaseResponseModel {}

export interface GraphData {
  subjectConditionList: Entity[];
  subjectIds: number[];
}
