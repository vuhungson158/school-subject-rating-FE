import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherLabel, TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {PageRequest, ResponseWrapper} from "../../../model/commonModel";
import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {useEffect, useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {TeacherListFilter, teacherReduxActions} from "../../../app/teacherSlice";
import teacherApi from "../../../api/teacherApi";

const TeacherListTable = () => {
    const tableHeaderLabels: string[] = useTableHeaderLabels();
    const isFetching: boolean = useFetchDataOnMount();

    return (
        <TableContainer>
            <TableHeader headers={tableHeaderLabels}/>
            {isFetching
                ? <TableSkeleton headers={tableHeaderLabels}/>
                : <TeacherTableBody/>}
        </TableContainer>
    );
};

const TeacherTableBody = () => {
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const tableData: TableData[] = useTableData();
    return <TableBody header={tableHeaders} data={tableData}/>
}

const getTableHeaders = (): Array<keyof TableData> => {
    return ["name", "gender", "nationality", "dob"]
}

const useTableHeaderLabels = (): string[] => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const teacherModelLabel: TeacherLabel = texts.model.teacher;
    return tableHeaders.map((header: keyof TableData) => teacherModelLabel[header])
}

type TableData = {
    name: string,
    gender: string,
    nationality: string,
    dob: string
}

const useTableDataMapping = (teacherList: TeacherResponseModel[]): TableData[] => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return teacherList.map((teacher: TeacherResponseModel): TableData => ({
        name: `${teacher.name} (${teacher.furigana})`,
        gender: teacher.gender,
        nationality: teacher.nationality,
        dob: `${texts.util.formatDate(teacher.dob)}(${teacher.age})`
    }));
}

const useFetchDataOnMount = (): boolean => {
    const dispatch: AppDispatch = useAppDispatch();

    const [isFetching, setFetching]: UseState<boolean> = useState(false);
    useEffect((): void => {
        (async (): Promise<void> => {
            setFetching(true);
            const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
            dispatch(teacherReduxActions.setTeacherList(response.data));
            setFetching(false);
        })();
    }, [dispatch])
    return isFetching;
}

const useTableData = (): TableData[] => {
    const filter: TeacherListFilter = useAppSelector((root: RootState) => root.teacher.filter);
    const pagination: PageRequest = useAppSelector((root: RootState) => root.teacher.pagination);

    let teacherList: TeacherResponseModel[] = useAppSelector((root: RootState) => root.teacher.list);
    teacherList = filterTableData(teacherList, filter);
    teacherList = pagingTableData(teacherList, pagination);
    return useTableDataMapping(teacherList);
}

const filterTableData = (teacherList: TeacherResponseModel[], filter: TeacherListFilter): TeacherResponseModel[] => {
    return teacherList;
}

const pagingTableData = (teacherList: TeacherResponseModel[], pagination: PageRequest): TeacherResponseModel[] => {
    return teacherList;
}


export default TeacherListTable;