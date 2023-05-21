import { BaseEntity } from "../../common/model";

export interface Request {
  fromId: number;
  toId: number;
}

interface Entity extends Request, BaseEntity {}

export interface Graph {
  entityList: Entity[];
  subjectIds: number[];
}
