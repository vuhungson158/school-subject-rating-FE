import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {TeacherLabel, TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {CustomRouterLink} from "../../../ui";
import React from "react";
import {PopMode} from "../../../common/enums";
import {Util} from "../../../util";
import {HeaderLabelsMap, TableKey} from "../../common/TableTemplate";

type TableRow = {
    name: JSX.Element,
    gender: string,
    nationality: string,
    dob: string
}
type TeacherTableKey = TableKey<TableRow>;
type TeacherHeaderLabelsMap = HeaderLabelsMap<TeacherTableKey>;

export const displayColumns = ["name", "gender", "nationality", "dob"] as const;

export const useHeaderLabelsMap = (tableHeaders: ReadonlyArray<TeacherTableKey>): TeacherHeaderLabelsMap => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const teacherModelLabel: TeacherLabel = texts.model.teacher;
    return Util.convertArrayToObject(tableHeaders, (key: TeacherTableKey) => teacherModelLabel[key])
}

export const useTableDataMapping = (teacherList: TeacherResponseModel[]): TableRow[] => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return teacherList.map((teacher: TeacherResponseModel): TableRow => {
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