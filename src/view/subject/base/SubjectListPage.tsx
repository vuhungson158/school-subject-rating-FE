import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import SubjectListFilter, {subjectFilterInitValue, SubjectListFilterModel} from "./SubjectListFilter";
import AddButton from "../../common/AddButton";
import {useFilter, UseFilterReturn} from "../../common/ListFilter";
import {UseObjectState} from "../../../common/WrapperType";
import {useAppSelector, useObjectState} from "../../../app/hooks";
import Paginator, {usePaging, UsePagingReturn} from "../../common/Paginator";
import {SubjectJoinTeacherModel} from "../../../model/subjectModel";
import TableTemplate from "../../common/TableTemplate";
import React, {useEffect} from "react";
import {displayColumns, useHeaderLabelsMap, useTableDataMapping} from "./SubjectListTable";
import {TriggerValue} from "../../../app/triggerSlice";
import {RootState} from "../../../app/store";
import {Page, ResponseWrapper} from "../../../model/commonModel";
import subjectApi from "../../../api/subjectApi";

interface SubjectListState {
    isFetching: boolean;
    page: Page<SubjectJoinTeacherModel>
}

const stateInit: SubjectListState = {
    isFetching: false,
    page: {
        content: [],
        totalElements: 0
    },
}

export const SubjectListPage = () => {
    const refreshTrigger: TriggerValue = useAppSelector((state: RootState) => state.trigger.subjectList);
    const [state, setStatePartially]: UseObjectState<SubjectListState> = useObjectState<SubjectListState>(stateInit);
    const subjectFilterProps: UseFilterReturn<SubjectListFilterModel> = useFilter(subjectFilterInitValue);
    const paginatorProps: UsePagingReturn = usePaging();

    const callApi = async (): Promise<void> => {
        setStatePartially({isFetching: true});
        const response: ResponseWrapper<Page<SubjectJoinTeacherModel>> =
            await subjectApi.findAll(subjectFilterProps.filter, paginatorProps.page, paginatorProps.limit);
        setStatePartially({page: response.data, isFetching: false});
    }

    useEffect(() => {
        void callApi();
    }, [paginatorProps.page]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        void callApi();
        paginatorProps.backFistPage();
    }, [refreshTrigger, paginatorProps.limit]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <SubjectListFilter {...subjectFilterProps} isLoading={state.isFetching}/>
            <AddButton/>
            <TableTemplate
                isFetching={state.isFetching}
                displayColumns={displayColumns}
                headerLabelsMap={useHeaderLabelsMap(displayColumns)}
                list={useTableDataMapping(state.page.content)}
            />
            <Paginator {...paginatorProps} listSize={state.page.totalElements}/>
            <Outlet/>
        </Box>
    );
};