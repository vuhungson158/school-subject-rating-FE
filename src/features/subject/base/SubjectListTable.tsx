import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {ReactNode, useState} from "react";
import {SubjectLabel, TextFields} from "../../../language";
import {useAppDispatch, useAppSelector, useAsync} from "../../../app/hooks";
import {AppDispatch, RootState} from "../../../app/store";
import {SubjectJoinTeacherResponseModel} from "../../../model/subjectModel";
import {CustomRouterLink} from "../../../commonUI/Link";
import {PopMode} from "../../../constant/featureLabel";
import Checkbox from '@mui/material/Checkbox';
import {UseState} from "../../../common/WrapperType";
import subjectApi from "../../../api/subjectApi";

export const SubjectListTable = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const tableHeaderLabels: string[] = useTableHeaderLabels();

    return (
        <TableContainer>
            <TableHeader headers={tableHeaderLabels}/>
            {isFetching
                ? <TableSkeleton headers={tableHeaderLabels}/>
                : <SubjectTableBody subjectList={[]}/>}
        </TableContainer>
    )
}

const useRefreshList = () => {
    const [loading, setLoading]: UseState<boolean> = useState(true);
    const [subjectList, setSubjectList]: UseState<SubjectJoinTeacherResponseModel | undefined> = useState();
    useAsync(async () => {
        let promise = subjectApi.findAll(0, 10);
    }, []);
    return {loading}
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