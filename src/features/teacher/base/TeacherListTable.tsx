import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherLabel, TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {ResponseWrapper} from "../../../model/commonModel";
import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {ReactNode, useEffect, useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {TeacherPageRequest, teacherReduxActions} from "../../../app/teacherSlice";
import teacherApi from "../../../api/teacherApi";
import {TEACHER} from "../../../constant/featureLabel";
import {CustomRouterLink} from "../../../commonUI/Link";
import {pagingTableData} from "./TeacherListPaginator";
import {useLocation} from "react-router-dom";

const TeacherListTable = () => {
    const tableHeaderLabels: string[] = useTableHeaderLabels();
    const isFetching: boolean = useFetchDataOnMount();

    console.log("rerender")

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
    const teacherPagination: TeacherPageRequest = useAppSelector((root: RootState) => root.teacher.pagination);
    const teacherListAfterFilter: TeacherResponseModel[] =
        useAppSelector((root: RootState) => root.teacher.listAfterFilter);
    const teacherListAfterFilterAndPaging: TeacherResponseModel[] =
        pagingTableData(teacherListAfterFilter, teacherPagination);

    const tableHeaders: Array<keyof TableData> = getTableHeaders();
    const tableData: TableData[] = useTableDataMapping(teacherListAfterFilterAndPaging);
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
            // TODO date format multi-language
            dob: `${teacher.dob}(${teacher.age} ${texts.common.age})`
        }
    });
}

const useFetchDataOnMount = (): boolean => {
    const dispatch: AppDispatch = useAppDispatch();
    const {state} = useLocation();

    const [isFetching, setFetching]: UseState<boolean> = useState(false);
    useEffect((): void => {
        (async (): Promise<void> => {
            console.log(state)
            setFetching(true);
            const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
            dispatch(teacherReduxActions.setTeacherList(response.data));
            setFetching(false);
        })();
    }, [dispatch, state])
    return isFetching;
}

export default TeacherListTable;