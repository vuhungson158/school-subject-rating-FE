import React from "react";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Limit, PageRequest} from "../../../model/commonModel";
import {ListPagePaginator} from "../../../layout/ListPagePaginator";
import {subjectReduxActions} from "../../../app/subjectSlice";

export const SubjectListPaginator = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const subjectPagination: PageRequest = useAppSelector((root: RootState) => root.subject.pagination);
    const liseSize: number = useAppSelector((root: RootState) => root.subject.liseSize);

    return (
        <ListPagePaginator
            listSize={liseSize}
            page={subjectPagination.page}
            limit={subjectPagination.limit}
            onPageChange={(page: number): void => {
                dispatch(subjectReduxActions.setPagination({
                    ...subjectPagination,
                    page: page - 1
                }));
            }}
            onLimitChange={(limit: Limit): void => {
                dispatch(subjectReduxActions.setPagination({
                    ...subjectPagination,
                    limit: limit
                }));
            }}
        />
    )
}
