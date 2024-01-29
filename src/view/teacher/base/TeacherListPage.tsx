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
import {useAppSelector, useObjectState} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import teacherApi from "../../../api/teacherApi";
import {useFilter, UseFilterReturn} from "../../common/ListFilter";
import AddButton from "../../common/AddButton";
import Paginator, {usePaging, UsePagingReturn} from "../../common/Paginator";
import {UseObjectState} from "../../../common/WrapperType";
import {RootState} from "../../../app/store";
import {Trigger} from "../../../app/triggerSlice";

interface TeacherListState {
    isFetching: boolean;
    originList: TeacherResponseModel[];
    filteredList: TeacherResponseModel[];
    finalList: TeacherResponseModel[];
}

const stateInit: TeacherListState = {
    isFetching: false,
    originList: [],
    filteredList: [],
    finalList: []
}

export const TeacherListPage = () => {
    const refreshTrigger: Trigger = useAppSelector((state: RootState) => state.trigger.refreshList.teacher);
    const [state, setStatePartially]: UseObjectState<TeacherListState> = useObjectState<TeacherListState>(stateInit);
    const teacherFilterProps: UseFilterReturn<TeacherListFilterModel> = useFilter(teacherFilterInitValue);
    const paginatorProps: UsePagingReturn = usePaging();

    useEffect(() => {
        const callApi = async (): Promise<void> => {
            setStatePartially({isFetching: true});
            const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
            setStatePartially({originList: response.data, isFetching: false});
        }
        void callApi();
    }, [refreshTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const filteredList: TeacherResponseModel[] = filterTeacherList(teacherFilterProps.filter, state.originList);
        paginatorProps.backFistPage();
        setStatePartially({filteredList});
    }, [state.originList, teacherFilterProps.filter]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const finalList: TeacherResponseModel[] = paginatorProps.manualPaging(state.filteredList);
        setStatePartially({finalList});
    }, [paginatorProps.page, paginatorProps.limit, state.filteredList]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <TeacherListFilter {...teacherFilterProps}/>
            <AddButton/>
            <TeacherListTable isFetching={state.isFetching} teacherList={state.finalList}/>
            <Paginator {...paginatorProps} listSize={state.filteredList.length}/>
            <Outlet/>
        </Box>
    )
}