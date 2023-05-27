import { BaseEntity, Department } from "../../common/model";
import { BigClass, MiddleClass, SmallClass } from "../base/classificationModel";
import { Entity as SubjectEntity } from "../base/model";

export interface Request {
  userId: number;
  subjectIdList: number[];
}
export interface Entity extends Request, BaseEntity {}
export interface SubjectWithCondition extends SubjectEntity {
  conditionIdList: number[];
}

export interface DepartmentGroup extends Group<Department> {
  bigList: BigGroup[];
}

interface BigGroup extends Group<BigClass> {
  creditNeeded: number;
  rowspan: number;
  middleList: MiddleGroup[];
}

interface MiddleGroup extends Group<MiddleClass> {
  creditNeeded: number;
  rowspan: number;
  smallList: SmallGroup[];
}

interface SmallGroup extends Group<SmallClass> {
  yearList: SubjectByYear;
}

type SubjectByYear<T = SubjectWithCondition[]> = [T, T, T, T];

interface Group<N = string> {
  name: N;
  label: string;
}
