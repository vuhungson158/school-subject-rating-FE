import React from "react";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {PageRequest} from "../../../model/commonModel";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherPageRequest, teacherReduxActions} from "../../../app/teacherSlice";
import {Paginator} from "../../common/Paginator";
import {teacherListAfterFilter} from "./TeacherListFilter";
import {Limit} from "../../../model/templateLiteral";

const TeacherListPaginator = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const teacherPagination: TeacherPageRequest = useAppSelector((root: RootState) => root.teacher.pagination);
    const listSize: number = useAppSelector(teacherListAfterFilter).length;

    return (
        <Paginator
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

export const teacherListAfterFilterAndPaging = (root: RootState): TeacherResponseModel[] => {
    const teacherList: TeacherResponseModel[] = teacherListAfterFilter(root);
    const {page, limit}: PageRequest = root.teacher.pagination;
    return teacherList.slice(page * limit, (page + 1) * limit);
}

export default TeacherListPaginator;