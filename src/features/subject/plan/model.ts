import { BaseEntity, Department } from "../../common/model";
import { BigClass, MiddleClass, SmallClass } from "../base/classificationModel";
import { Entity as SubjectEntity } from "../base/model";

export interface Request {
  userId: number;
  subjectIdList: number[];
}
export interface Entity extends Request, BaseEntity {}
export interface SubjectWithCondition {
  subjectEntity: SubjectEntity;
  conditionList: number[];
}

export class BigList implements BigListInterface {
  list: BigGroup[];
  requireList: number[];

  constructor(list: BigGroup[]) {
    this.list = list;
    const requireList: number[] = [];
    this.loop(({ subject }) => {
      if (subject.subjectEntity.require) {
        requireList.push(subject.subjectEntity.id);
      }
    });
    this.requireList = requireList;
  }

  loop(
    consumer: ({
      big,
      middle,
      small,
      year,
      subject,
    }: {
      big: BigGroup;
      middle: MiddleGroup;
      small: SmallGroup;
      year: SubjectWithCondition[];
      subject: SubjectWithCondition;
    }) => void,
  ): void {
    this.list.forEach((big) => {
      big.middleList.forEach((middle) => {
        middle.smallList.forEach((small) => {
          small.yearList.forEach((year) => {
            year.forEach((subject) => {
              consumer({ big, middle, small, year, subject });
            });
          });
        });
      });
    });
  }
}

interface BigListInterface {
  list: BigGroup[];
  loop: (consumer: () => void) => void;
}

export interface BigGroup extends Group<BigClass> {
  creditNeeded: number;
  requiredCredits: number;
  rowspan: { [key in Department]: number };
  middleList: MiddleGroup[];
}

interface MiddleGroup extends Group<MiddleClass> {
  creditNeeded: number;
  requiredCredits: number;
  rowspan: { [key in Department]: number };
  smallList: SmallGroup[];
}

interface SmallGroup extends Group<SmallClass> {
  yearList: SubjectByYear;
  department: Department;
}

export type SubjectByYear<T = SubjectWithCondition[]> = [T, T, T];

interface Group<N = string> {
  name: N;
  label: string;
}
