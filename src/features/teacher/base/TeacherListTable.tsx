import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {PageRequest, ResponseWrapper} from "../../../model/commonModel";
import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {useEffect, useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {TeacherListFilter, teacherReduxActions} from "../../../app/teacherSlice";
import teacherApi from "../../../api/teacherApi";

const TeacherListTable = () => {
    const tableHeaders: Array<keyof TeacherResponseModel> = getTableHeaders();
    const isFetching: boolean = useFetchDataOnMount();

    return (
        <TableContainer>
            <TableHeader headers={tableHeaders}/>
            {isFetching
                ? <TableSkeleton headers={tableHeaders}/>
                : <TeacherTableBody/>}
        </TableContainer>
    );
};

const TeacherTableBody = () => {
    const tableData: TableData[] = useTableData();
    return <TableBody data={tableData}/>
}

const getTableHeaders = (): Array<keyof TeacherResponseModel> => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    // texts.model.teacher.request.
    return ["name", "gender", "nationality", "dob"]
}

type TableData = {
    name: string,
    gender: string,
    nationality: string,
    dob: string
}

const mapToTableData = (teacherList: TeacherResponseModel[]): TableData[] => {
    return teacherList.map((teacher: TeacherResponseModel): TableData => ({
        name: teacher.name,
        gender: teacher.gender,
        nationality: teacher.nationality,
        dob: teacher.dob
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
    return mapToTableData(teacherList);
}

const filterTableData = (teacherList: TeacherResponseModel[], filter: TeacherListFilter): TeacherResponseModel[] => {
    return teacherList;
}

const pagingTableData = (teacherList: TeacherResponseModel[], pagination: PageRequest): TeacherResponseModel[] => {
    return teacherList;
}


export default TeacherListTable;