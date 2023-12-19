import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherLabel, TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {PageRequest, ResponseWrapper} from "../../../model/commonModel";
import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {ReactNode, useEffect, useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {TeacherListFilterProps, teacherReduxActions} from "../../../app/teacherSlice";
import teacherApi from "../../../api/teacherApi";
import {TEACHER} from "../../../constant/featureLabel";
import {CustomRouterLink} from "../../../commonUI/Link";
import {Util} from "../../../util";
import {filterTableData} from "./TeacherListFilter";

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
            dob: `${Util.formatDate(teacher.dob, texts.util.dateFormat)}(${teacher.age} ${texts.common.age})`
        }
    });
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
    const filter: TeacherListFilterProps = useAppSelector((root: RootState) => root.teacher.filter);
    const pagination: PageRequest = useAppSelector((root: RootState) => root.teacher.pagination);

    let teacherList: TeacherResponseModel[] = useAppSelector((root: RootState) => root.teacher.list);
    teacherList = filterTableData(teacherList, filter);
    teacherList = pagingTableData(teacherList, pagination);
    return useTableDataMapping(teacherList);
}

const pagingTableData = (teacherList: TeacherResponseModel[], pagination: PageRequest): TeacherResponseModel[] => {
    return teacherList;
}


export default TeacherListTable;