import {BaseResponseModel, Department, NameLabel} from "../../../model/commonModel";
import {BigClass, MiddleClass, NestedBig, NestedMiddle, NestedSmall, SmallClass} from "../../../model/classificationModel";
import {SubjectEntity as SubjectEntity} from "../../../model/subjectModel";

export interface Request {
    userId: number;
    subjectIdList: number[];
}

export interface Entity extends Request, BaseResponseModel {
}

export interface SubjectWithCondition {
    subjectEntity: SubjectEntity;
    conditionList: number[];
}

export class BigList implements BigListInterface {
    list: BigGroup[];
    requireList: number[];
    bigs: NameLabel<BigClass>[];
    middles: NameLabel<MiddleClass>[];
    smalls: NameLabel<SmallClass>[];
    nested: NestedBig;

    constructor(list: BigGroup[]) {
        this.list = list;
        const requireList: number[] = [];
        this.loop(({subject}) => {
            if (subject.subjectEntity.require) {
                requireList.push(subject.subjectEntity.id);
            }
        });
        this.requireList = requireList;
        const bigs: NameLabel<BigClass>[] = []
        const middles: NameLabel<MiddleClass>[] = []
        const smalls: NameLabel<SmallClass>[] = []
        this.list.forEach(big => {
            bigs.push({
                name: big.name,
                label: big.label
            })
            big.middleList.forEach(middle => {
                middles.push({
                    name: middle.name,
                    label: middle.label
                })
                middle.smallList.forEach(small => {
                    smalls.push({
                        name: small.name,
                        label: small.label
                    })
                })
            })
        })
        this.bigs = bigs;
        this.middles = middles;
        this.smalls = smalls;


        // Error
        this.nested = this.list.reduce<NestedBig>((bigObj, big) => ({
            ...bigObj,
            [big.name]: {
                label: big.label,
                child: big.middleList.reduce<NestedMiddle>((middleObj, middle) => ({
                    ...middleObj,
                    [middle.name]: {
                        label: middle.label,
                        child: middle.smallList.map<NestedSmall>(small => ({
                            name: small.name,
                            label: small.label
                        }))
                    }
                }), {})
            }
        }), {})
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
                            consumer({
                                big,
                                middle,
                                small,
                                year,
                                subject
                            });
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

export interface MiddleGroup extends Group<MiddleClass> {
    creditNeeded: number;
    requiredCredits: number;
    rowspan: { [key in Department]: number };
    smallList: SmallGroup[];
}

export interface SmallGroup extends Group<SmallClass> {
    yearList: SubjectByYear;
    department: Department;
}

export type SubjectByYear<T = SubjectWithCondition[]> = [T, T, T];

interface Group<N = string> {
    name: N;
    label: string;
}
