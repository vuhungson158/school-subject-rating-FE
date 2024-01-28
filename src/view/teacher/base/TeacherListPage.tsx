import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import TeacherListFilter, {
    filterTeacherList,
    teacherFilterInitValue,
    TeacherListFilterModel
} from "./TeacherListFilter";
import TeacherListTable from "./TeacherListTable";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {useEffect} from "react";
import {useAsyncOnDidMount, useObjectState} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import teacherApi from "../../../api/teacherApi";
import {UseFilterProps, useFilterProps} from "../../common/ListFilter";
import AddButton from "../../common/AddButton";
import {Paginator, UsePaginatorProps, usePaginatorProps} from "../../common/Paginator";
import {UseObjectState} from "../../../common/WrapperType";

interface TeacherListState {
    isFetching: boolean;
    originList: TeacherResponseModel[];
    filterListSize: number;
    finalList: TeacherResponseModel[];
}

const stateInit: TeacherListState = {
    isFetching: false,
    originList: [],
    filterListSize: 0,
    finalList: []
}

export const TeacherListPage = () => {
    const [state, setStatePartially]: UseObjectState<TeacherListState> = useObjectState<TeacherListState>(stateInit);
    const teacherFilterProps: UseFilterProps<TeacherListFilterModel> =
        useFilterProps({initValue: teacherFilterInitValue});
    const paginatorProps: UsePaginatorProps = usePaginatorProps();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
        setStatePartially({originList: response.data});
    });
    useEffect(() => {
        const filteredList: TeacherResponseModel[] = filterTeacherList(teacherFilterProps.filter, state.originList);
        const finalList: TeacherResponseModel[] = paginatorProps.manualPaging(filteredList);
        setStatePartially({finalList, filterListSize: filteredList.length});
    }, [state.originList, teacherFilterProps.filter]);

    return (
        <Box>
            <TeacherListFilter {...teacherFilterProps}/>
            <AddButton/>
            <TeacherListTable isFetching={state.isFetching} teacherList={state.finalList}/>
            <Paginator {...paginatorProps} listSize={state.filterListSize}/>
            <Outlet/>
        </Box>
    )
}