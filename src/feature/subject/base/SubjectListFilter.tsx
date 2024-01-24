import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {ListPageFilter} from "../../../ui/table/ListPageFilter";
import React from "react";
import {subjectReduxActions} from "../../../app/subjectSlice";
import {SubjectListFilter as SubjectListFilterProps} from "../../../model/subjectModel";
import {AsyncButton, SoloInputNumberFromTo, SoloInputTemplateLiteralSelect, SoloInputText} from "../../../ui";
import {UndefinedFromTo} from "../../../model/commonModel";
import {Department, departments} from "../../../model/templateLiteral";

export const SubjectListFilter = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const isListFetching: boolean = useAppSelector((root: RootState) => root.subject.isListFetching);
    const filter: SubjectListFilterProps = useAppSelector((root: RootState) => root.subject.filter);

    const dispatchFilter = (filter: SubjectListFilterProps): void => {
        dispatch(subjectReduxActions.setFilter(filter))
    };
    const triggerListRefresh = (): void => {
        dispatch(subjectReduxActions.refreshList());
    };

    return (
        <ListPageFilter onClear={() => dispatch(subjectReduxActions.clearFilter())}>
            <SoloInputNumberFromTo
                label="Credit"
                value={filter.credit}
                onChange={(value: UndefinedFromTo<number>) => dispatchFilter({...filter, credit: value})}
            />
            <SoloInputNumberFromTo
                label="Registrable Year"
                value={filter.registrableYear}
                onChange={(value: UndefinedFromTo<number>) => dispatchFilter({...filter, registrableYear: value})}

            />
            <SoloInputText
                label="Name"
                value={filter.name}
                onChange={(value?: string) => dispatchFilter({...filter, name: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Department"}
                value={filter.department}
                options={departments}
                onSelected={(value?: Department) => dispatchFilter({...filter, department: value})}
            />
            <AsyncButton isLoading={isListFetching} onClick={triggerListRefresh}>Refresh List</AsyncButton>
        </ListPageFilter>
    )
}
