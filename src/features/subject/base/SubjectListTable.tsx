import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {ReactNode, useState} from "react";
import {SubjectLabel, TextFields} from "../../../language";
import {useAppSelector, useAsync} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {SubjectJoinTeacherResponseModel} from "../../../model/subjectModel";
import {CustomRouterLink} from "../../../commonUI/Link";
import {PopMode} from "../../../constant/featureLabel";
import Checkbox from '@mui/material/Checkbox';
import {UseState} from "../../../common/WrapperType";
import subjectApi from "../../../api/subjectApi";
import {SubjectListFilter} from "../../../app/subjectSlice";
import {PageRequest, ResponseWrapper} from "../../../model/commonModel";

export const SubjectListTable = () => {
    const tableHeaderLabels: string[] = useTableHeaderLabels();
    const {isFetching, subjectList}: RefreshListReturn = useRefreshList();

    return (
        <TableContainer>
            <TableHeader headers={tableHeaderLabels}/>
            {isFetching
                ? <TableSkeleton headers={tableHeaderLabels}/>
                : <SubjectTableBody subjectList={subjectList}/>}
        </TableContainer>
    )
}

interface RefreshListReturn {
    isFetching: boolean;
    subjectList: SubjectJoinTeacherResponseModel[];
}

const useRefreshList = (): RefreshListReturn => {
    const filter: SubjectListFilter = useAppSelector((root: RootState) => root.subject.filter);
    const paging: PageRequest = useAppSelector((root: RootState) => root.subject.pagination);
    const listRefreshTrigger: number = useAppSelector((root: RootState) => root.subject.listRefreshTrigger);

    const [isFetching, setFetching]: UseState<boolean> = useState(false);
    const [subjectList, setSubjectList]: UseState<SubjectJoinTeacherResponseModel[]> =
        useState<SubjectJoinTeacherResponseModel[]>([]);

    useAsync(async (): Promise<void> => {
        setFetching(true);
        const response: ResponseWrapper<SubjectJoinTeacherResponseModel[]> =
            await subjectApi.findAll(filter, paging.page, paging.limit);
        setFetching(false);
        setSubjectList(response.data);
    }, [listRefreshTrigger, paging]);

    return {isFetching, subjectList}
}

const getTableHeaders = (): Array<keyof TableData> => {
    return ["name", "teacher", "credit", "formYear", "require"];
}

type TableData = {
    name: ReactNode,
    teacher: ReactNode,
    credit: number,
    formYear: string,
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
            <CustomRouterLink to={`${subject.teacher.id}/${PopMode.DETAIL}`}>
                {subject.teacher.name}
            </CustomRouterLink>
        const requireCheckBox: JSX.Element =
            <Checkbox disabled checked={subject.require}/>

        return {
            name: subjectNameLink,
            teacher: teacherNameLink,
            credit: subject.credit,
            formYear: `${subject.formYear}年生から`,
            require: requireCheckBox,
        }
    });
}

const SubjectTableBody = ({subjectList}: { subjectList: SubjectJoinTeacherResponseModel[] }) => {
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const tableData: TableData[] = useTableDataMapping(subjectList);

    return <TableBody header={tableHeaders} data={tableData}/>
}