import React from "react";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {Limit, PageRequest} from "../../../model/commonModel";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherPageRequest, teacherReduxActions} from "../../../app/teacherSlice";
import {ListPagePaginator} from "../../../layout/ListPagePaginator";

const TeacherListPaginator = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const teacherPagination: TeacherPageRequest = useAppSelector((root: RootState) => root.teacher.pagination);
    const listSize: number = useAppSelector((root: RootState) => root.teacher.listAfterFilter.length);

    return (
        <ListPagePaginator
            listSize={listSize}
            page={teacherPagination.page}
            limit={teacherPagination.limit}
            onPageChange={(page: number): void => {
                dispatch(teacherReduxActions.setPagination({
                    ...teacherPagination,
                    page: page - 1
                }));
            }}
            onLimitChange={(limit: Limit): void => {
                dispatch(teacherReduxActions.setPagination({
                    ...teacherPagination,
                    limit: limit
                }));
            }}
        />
    )
}

export const pagingTableData = (teacherList: TeacherResponseModel[], pagination: PageRequest): TeacherResponseModel[] => {
    const {page, limit}: PageRequest = pagination;
    return teacherList.slice(page * limit, (page + 1) * limit);
}

export default TeacherListPaginator;