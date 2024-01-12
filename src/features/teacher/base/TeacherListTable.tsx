import {useAppSelector, useFetchDataOnMount} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {TeacherLabel, TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {ReactNode} from "react";
import {TeacherPageRequest} from "../../../app/teacherSlice";
import {TEACHER} from "../../../constant/featureLabel";
import {CustomRouterLink} from "../../../commonUI/Link";
import {pagingTableData} from "./TeacherListPaginator";
import {teacherThunk} from "../../../thunk/teacherThunk";

const TeacherListTable = () => {
    useFetchDataOnMount(teacherThunk.findAll());
    const isFetching: boolean = useAppSelector((root: RootState) => root.teacher.isListFetching);
    const tableHeaderLabels: string[] = useTableHeaderLabels();

    return (
        <TableContainer>
            <TableHeader headers={tableHeaderLabels}/>
            {isFetching
                ? <TableSkeleton headers={tableHeaderLabels}/>
                : <TeacherTableBody/>}
        </TableContainer>
    );
};

const getTableHeaders = (): Array<keyof TableData> => {
    return ["name", "gender", "nationality", "dob"]
}

type TableData = {
    name: ReactNode,
    gender: string,
    nationality: string,
    dob: string
}

const useTableHeaderLabels = (): string[] => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const teacherModelLabel: TeacherLabel = texts.model.teacher;
    return tableHeaders.map((header: keyof TableData) => teacherModelLabel[header])
}

const useTableDataMapping = (teacherList: TeacherResponseModel[]): TableData[] => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return teacherList.map((teacher: TeacherResponseModel): TableData => {
        const teacherNameLink: JSX.Element =
            <CustomRouterLink to={`/${TEACHER}/${teacher.id}`}>
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

const TeacherTableBody = () => {
    const teacherPagination: TeacherPageRequest = useAppSelector((root: RootState) => root.teacher.pagination);
    const teacherListAfterFilter: TeacherResponseModel[] =
        useAppSelector((root: RootState) => root.teacher.listAfterFilter);
    const teacherListAfterFilterAndPaging: TeacherResponseModel[] =
        pagingTableData(teacherListAfterFilter, teacherPagination);

    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const tableData: TableData[] = useTableDataMapping(teacherListAfterFilterAndPaging);
    return <TableBody header={tableHeaders} data={tableData}/>
}

export default TeacherListTable;