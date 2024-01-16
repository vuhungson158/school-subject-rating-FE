import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {ReactNode, useEffect, useState} from "react";
import {SubjectLabel, TextFields} from "../../../language";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {AppDispatch, RootState} from "../../../app/store";
import {SubjectJoinTeacherResponseModel} from "../../../model/subjectModel";
import {CustomRouterLink} from "../../../commonUI/Link";
import {Feature, PopMode} from "../../../constant/featureLabel";
import Checkbox from '@mui/material/Checkbox';
import {UseState} from "../../../common/WrapperType";
import subjectApi from "../../../api/subjectApi";
import {SubjectListFilter, subjectReduxActions} from "../../../app/subjectSlice";
import {Page, PageRequest, ResponseWrapper} from "../../../model/commonModel";

export const SubjectListTable = () => {
    const tableHeaderLabels: string[] = useTableHeaderLabels();
    const {isFetching, subjectList}: RefreshListReturn = useRefreshList();

    return (
        <TableContainer>
            <TableHeader headers={tableHeaderLabels}/>
            {!isFetching && subjectList
                ? <SubjectTableBody subjectList={subjectList}/>
                : <TableSkeleton headers={tableHeaderLabels}/>}
        </TableContainer>
    )
}

interface RefreshListReturn {
    isFetching: boolean;
    subjectList: SubjectJoinTeacherResponseModel[];
}

const useRefreshList = (): RefreshListReturn => {
    const dispatch: AppDispatch = useAppDispatch();

    const filter: SubjectListFilter = useAppSelector((root: RootState) => root.subject.filter);
    const paging: PageRequest = useAppSelector((root: RootState) => root.subject.pagination);
    const listRefreshTrigger: number = useAppSelector((root: RootState) => root.subject.listRefreshTrigger);

    const [isFetching, setFetching]: UseState<boolean> = useState(false);
    const [subjectList, setSubjectList]: UseState<SubjectJoinTeacherResponseModel[]> =
        useState<SubjectJoinTeacherResponseModel[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            setFetching(true);
            const response: ResponseWrapper<Page<SubjectJoinTeacherResponseModel>> =
                await subjectApi.findAll(filter, paging.page, paging.limit);
            setFetching(false);
            setSubjectList(response.data.content);
            dispatch(subjectReduxActions.setListSize(response.data.totalElements));
        })();
    }, [listRefreshTrigger, paging]); // eslint-disable-line react-hooks/exhaustive-deps

    return {isFetching, subjectList}
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
    const subjectModelLabel: SubjectLabel = texts.model.subject.base;
    return tableHeaders.map((header: keyof TableData) => subjectModelLabel[header])
}

const useTableDataMapping = (subjectList: SubjectJoinTeacherResponseModel[]): TableData[] => {
    return subjectList.map((subject: SubjectJoinTeacherResponseModel): TableData => {
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

const SubjectTableBody = ({subjectList}: { subjectList: SubjectJoinTeacherResponseModel[] }) => {
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const tableData: TableData[] = useTableDataMapping(subjectList);

    return <TableBody header={tableHeaders} data={tableData}/>
}