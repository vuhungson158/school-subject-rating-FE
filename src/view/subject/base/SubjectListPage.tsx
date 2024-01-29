import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {subjectFilterInitValue, SubjectListFilter, SubjectListFilterModel} from "./SubjectListFilter";
import {SubjectListTable} from "./SubjectListTable";
import AddButton from "../../common/AddButton";
import {useFilter, UseFilterReturn} from "../../common/ListFilter";
import {UseObjectState} from "../../../common/WrapperType";
import {useObjectState} from "../../../app/hooks";
import Paginator, {usePaging, UsePagingReturn} from "../../common/Paginator";
import {SubjectJoinTeacherModel} from "../../../model/subjectModel";

interface SubjectListState {
    isFetching: boolean;
    list: SubjectJoinTeacherModel[]
}

const stateInit: SubjectListState = {
    isFetching: false,
    list: [],
}

export const SubjectListPage = () => {
    const [state, setStatePartially]: UseObjectState<SubjectListState> = useObjectState<SubjectListState>(stateInit);
    const subjectFilterProps: UseFilterReturn<SubjectListFilterModel> = useFilter(subjectFilterInitValue);
    const paginatorProps: UsePagingReturn = usePaging();

    return (
        <Box>
            <SubjectListFilter {...subjectFilterProps} isLoading={state.isFetching}/>
            <AddButton/>
            <SubjectListTable/>
            <Paginator {...paginatorProps} listSize={state.list.length}/>
            <Outlet/>
        </Box>
    );
};