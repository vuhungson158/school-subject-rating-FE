import {Box, Pagination as Paginator} from "@mui/material";
import React from "react";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {PageRequest} from "../../../model/commonModel";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherPageRequest, teacherReduxActions} from "../../../app/teacherSlice";

const TeacherListPaginator = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const teacherPagination: TeacherPageRequest =
        useAppSelector((root: RootState) => root.teacher.pagination);
    const {listSize, page, limit} = teacherPagination;

    return (
        <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
            <Paginator
                size="large"
                count={Math.ceil(listSize / limit)}
                page={page + 1}
                color="secondary"
                onChange={(_: React.ChangeEvent<any>, page: number) => {
                    dispatch(teacherReduxActions.setFilter({
                        ...teacherPagination,
                        page: page - 1
                    }));
                }}
            />
            <Box>
                Limit: {limit} / Total: {listSize}
            </Box>
        </Box>
    )
}

export const pagingTableData = (teacherList: TeacherResponseModel[], pagination: PageRequest): TeacherResponseModel[] => {
    const {page, limit} = pagination;
    return teacherList.slice(page * limit, (page + 1) * limit);
}

export default TeacherListPaginator;