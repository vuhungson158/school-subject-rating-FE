import {CustomRouterLink, TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../ui";
import {ReactNode, useEffect, useState} from "react";
import {SubjectLabel, TextFields} from "../../../language";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {AppDispatch, RootState} from "../../../app/store";
import {SubjectJoinTeacherModel, SubjectListFilter} from "../../../model/subjectModel";
import {Feature, PopMode} from "../../../common/enums";
import Checkbox from '@mui/material/Checkbox';
import {UseState} from "../../../common/WrapperType";
import subjectApi from "../../../api/subjectApi";
import {subjectReduxActions} from "../../../app/subjectSlice";
import {Page, PageRequest, ResponseWrapper} from "../../../model/commonModel";

export const SubjectListTable = () => {
    const isListFetching: boolean = useAppSelector((root: RootState) => root.subject.isListFetching);
    const tableHeaderLabels: string[] = useTableHeaderLabels();
    const subjectList: SubjectJoinTeacherModel[] = useRefreshList();

    return (
        <TableContainer>
            <TableHeader headers={tableHeaderLabels}/>
            {!isListFetching && subjectList
                ? <SubjectTableBody subjectList={subjectList}/>
                : <TableSkeleton headers={tableHeaderLabels}/>}
        </TableContainer>
    )
}

const useRefreshList = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const filter: SubjectListFilter = useAppSelector((root: RootState) => root.subject.filter);
    const paging: PageRequest = useAppSelector((root: RootState) => root.subject.pagination);
    const listRefreshTrigger: number = useAppSelector((root: RootState) => root.subject.listRefreshTrigger);

    const [subjectList, setSubjectList]: UseState<SubjectJoinTeacherModel[]> =
        useState<SubjectJoinTeacherModel[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            dispatch(subjectReduxActions.setListFetching(true));
            const response: ResponseWrapper<Page<SubjectJoinTeacherModel>> =
                await subjectApi.findAll(filter, paging.page, paging.limit);
            dispatch(subjectReduxActions.setListFetching(false));
            setSubjectList(response.data.content);
            dispatch(subjectReduxActions.setListSize(response.data.totalElements));
        })();
    }, [listRefreshTrigger, paging]); // eslint-disable-line react-hooks/exhaustive-deps

    return subjectList;
}

const getTableHeaders = (): Array<keyof TableData> => {
    return ["name", "teacher", "credit", "registrableYear", "require"];
}

type TableData = {
    name: ReactNode,
    teacher: ReactNode,
    credit: number,
    registrableYear: string,
    require: ReactNode,
}

const useTableHeaderLabels = (): string[] => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const subjectModelLabel: SubjectLabel = texts.model.subject;
    return tableHeaders.map((header: keyof TableData) => subjectModelLabel[header])
}

const useTableDataMapping = (subjectList: SubjectJoinTeacherModel[]): TableData[] => {
    return subjectList.map((subject: SubjectJoinTeacherModel): TableData => {
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

const SubjectTableBody = ({subjectList}: { subjectList: SubjectJoinTeacherModel[] }) => {
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const tableData: TableData[] = useTableDataMapping(subjectList);

    return <TableBody header={tableHeaders} data={tableData}/>
}