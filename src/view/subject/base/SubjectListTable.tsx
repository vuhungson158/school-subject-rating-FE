import {CustomRouterLink} from "../../../ui";
import React from "react";
import {SubjectLabel, TextFields} from "../../../language";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {SubjectJoinTeacherModel} from "../../../model/subjectModel";
import {Feature, PopMode} from "../../../common/enums";
import Checkbox from '@mui/material/Checkbox';
import {HeaderLabelsMap, TableKey} from "../../common/TableTemplate";
import {Util} from "../../../util";

// const useRefreshList = () => {
//     const dispatch: AppDispatch = useAppDispatch();
//
//     const filter: SubjectListFilter = useAppSelector((root: RootState) => root.subject.filter);
//     const paging: PageRequest = useAppSelector((root: RootState) => root.subject.pagination);
//     const listRefreshTrigger: number = useAppSelector((root: RootState) => root.subject.listRefreshTrigger);
//
//     const [subjectList, setSubjectList]: UseState<SubjectJoinTeacherModel[]> =
//         useState<SubjectJoinTeacherModel[]>([]);
//
//     useEffect(() => {
//         (async (): Promise<void> => {
//             dispatch(subjectReduxActions.setListFetching(true));
//             const response: ResponseWrapper<Page<SubjectJoinTeacherModel>> =
//                 await subjectApi.findAll(filter, paging.page, paging.limit);
//             dispatch(subjectReduxActions.setListFetching(false));
//             setSubjectList(response.data.content);
//             dispatch(subjectReduxActions.setListSize(response.data.totalElements));
//         })();
//     }, [listRefreshTrigger, paging]); // eslint-disable-line react-hooks/exhaustive-deps
//
//     return subjectList;
// }
type TableRow = {
    name: JSX.Element,
    teacher: JSX.Element,
    credit: number,
    registrableYear: string,
    require: JSX.Element,
}
type SubjectTableKey = TableKey<TableRow>;
type SubjectHeaderLabelsMap = HeaderLabelsMap<SubjectTableKey>;

export const displayColumns = ["name", "teacher", "credit", "registrableYear", "require"] as const;

export const useHeaderLabelsMap = (tableHeaders: ReadonlyArray<SubjectTableKey>): SubjectHeaderLabelsMap => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const subjectModelLabel: SubjectLabel = texts.model.subject;
    return Util.convertArrayToObject(tableHeaders, ((key: SubjectTableKey) => subjectModelLabel[key]));
}

export const useTableDataMapping = (subjectList: SubjectJoinTeacherModel[]): TableRow[] => {
    return subjectList.map((subject: SubjectJoinTeacherModel): TableRow => {
        const subjectNameLink: JSX.Element =
            <CustomRouterLink to={`${subject.id}/${PopMode.DETAIL}`}>
                {subject.name}
            </CustomRouterLink>
        const teacherNameLink: JSX.Element =
            <CustomRouterLink to={`/${Feature.TEACHER}/${subject.teacher.id}/${PopMode.DETAIL}`}>
                {subject.teacher.name}
            </CustomRouterLink>
        const requireCheckBox: JSX.Element =
            <Checkbox readOnly checked={subject.require}/>

        return {
            name: subjectNameLink,
            teacher: teacherNameLink,
            credit: subject.credit,
            registrableYear: `${subject.registrableYear} 年生から`,
            require: requireCheckBox,
        }
    });
}