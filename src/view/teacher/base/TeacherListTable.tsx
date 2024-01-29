import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {TeacherLabel, TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {CustomRouterLink} from "../../../ui";
import React from "react";
import {PopMode} from "../../../common/enums";
import {Util} from "../../../util";

type TableData = {
    name: JSX.Element,
    gender: string,
    nationality: string,
    dob: string
}
type TableKey = keyof TableData;
type HeaderLabelsMap = Record<TableKey, string>;

export const displayColumns = ["name", "gender", "nationality", "dob"] as const;

export const useHeaderLabelsMap = (tableHeaders: ReadonlyArray<TableKey>): HeaderLabelsMap => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const teacherModelLabel: TeacherLabel = texts.model.teacher;
    return Util.convertArrayToObject(tableHeaders, (key: TableKey) => teacherModelLabel[key])
}

export const useTableDataMapping = (teacherList: TeacherResponseModel[]): TableData[] => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return teacherList.map((teacher: TeacherResponseModel): TableData => {
        const teacherNameLink: JSX.Element =
            <CustomRouterLink to={`${teacher.id}/${PopMode.DETAIL}`}>
                {`${teacher.name} (${teacher.furigana})`}
            </CustomRouterLink>

        return {
            name: teacherNameLink,
            gender: texts.enum.gender[teacher.gender],
            nationality: teacher.nationality,
            // TODO date format multi-language
            dob: `${teacher.dob}(${teacher.age} ${texts.common.age})`
        }
    });
}