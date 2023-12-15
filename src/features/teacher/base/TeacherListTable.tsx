import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {PageRequest, ResponseWrapper} from "../../../model/commonModel";
import {TableBody, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {useEffect, useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {TeacherListFilter, teacherReduxActions} from "../../../app/teacherSlice";
import teacherApi from "../../../api/teacherApi";

const TeacherListTable = () => {
    const tableHeaders: Array<keyof TeacherResponseModel> = getTableHeaders();
    const isFetching: boolean = useFetchDataOnMount();

    return (
        <Box>
            <TableHeader headers={tableHeaders}/>
            {isFetching
                ? <TableSkeleton headers={tableHeaders}/>
                : <TeacherTableBody/>}
        </Box>
    );
};

const TeacherTableBody = () => {
    const tableData: TableData = useTableData();
    return <TableBody data={tableData}/>
}

const getTableHeaders = (): Array<keyof TeacherResponseModel> => {
    return ["name", "gender", "nationality", "dob"]
}

type TableData = Array<{
    name: string,
    gender: string,
    nationality: string,
    dob: string
}>

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

const useTableData = (): TableData => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    const filter: TeacherListFilter = useAppSelector((root: RootState) => root.teacher.filter);
    const pagination: PageRequest = useAppSelector((root: RootState) => root.teacher.pagination);

    let teacherList: TeacherResponseModel[] = useAppSelector((root: RootState) => root.teacher.list);
    teacherList = filterTableData(teacherList, filter);
    teacherList = pagingTableData(teacherList, pagination);
    return mapToTableData(teacherList);
}

const filterTableData = (teacherList: TeacherResponseModel[], filter: TeacherListFilter): TeacherResponseModel[] => {
    return teacherList;
}

const pagingTableData = (teacherList: TeacherResponseModel[], pagination: PageRequest): TeacherResponseModel[] => {
    return teacherList;
}

const mapToTableData = (teacherList: TeacherResponseModel[]): TableData => {
    return teacherList;
}

export default TeacherListTable;