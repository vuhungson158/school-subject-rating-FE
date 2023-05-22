import { BaseEntity } from "../../common/model";

export interface Request {
  fromId: number;
  toId: number;
}

interface Entity extends Request, BaseEntity {}

export interface GraphData {
  subjectConditionList: Entity[];
  subjectIds: number[];
}
