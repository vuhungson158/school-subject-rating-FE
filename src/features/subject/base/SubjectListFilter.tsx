import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {ListPageFilter} from "../../../layout/ListPageFilter";
import React from "react";
import {SubjectListFilter as SubjectListFilterProps, subjectReduxActions} from "../../../app/subjectSlice";
import {AsyncButton} from "../../../commonUI/Button";

export const SubjectListFilter = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const filter: SubjectListFilterProps = useAppSelector((root: RootState) => root.subject.filter);

    const dispatchFilter = (filter: SubjectListFilterProps): void => {
        dispatch(subjectReduxActions.setFilter(filter))
    };

    return (
        <ListPageFilter onClear={() => dispatch(subjectReduxActions.clearFilter())}>
            <AsyncButton isLoading={true}>Refresh List</AsyncButton>
        </ListPageFilter>
    )
}
