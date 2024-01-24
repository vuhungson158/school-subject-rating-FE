import {useAppDispatch, useAppSelector, useOnDidMount} from "../../../app/hooks";
import {AppDispatch, RootState} from "../../../app/store";
import {TeacherLabel, TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {CustomRouterLink, TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../ui";
import {ReactNode} from "react";
import {teacherThunk} from "../../../thunk/teacherThunk";
import {teacherListAfterFilterAndPaging} from "./TeacherListPaginator";
import {PopMode} from "../../../common/enums";

const TeacherListTable = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const isFetching: boolean = useAppSelector((root: RootState) => root.teacher.isListFetching);
    const tableHeaderLabels: string[] = useTableHeaderLabels();

    useOnDidMount(() => dispatch(teacherThunk.refreshList()));

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

const TeacherTableBody = () => {
    const teacherList: TeacherResponseModel[] = useAppSelector(teacherListAfterFilterAndPaging);
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const tableData: TableData[] = useTableDataMapping(teacherList);

    return <TableBody header={tableHeaders} data={tableData}/>
}

export default TeacherListTable;