import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {ListPageFilter} from "../../../layout/ListPageFilter";
import React from "react";
import {subjectReduxActions} from "../../../app/subjectSlice";
import {SubjectListFilter as SubjectListFilterProps} from "../../../model/subjectModel";
import {AsyncButton} from "../../../commonUI/Button";
import {ControlledNumber} from "../../../common/WrapperType";
import {
    SoloInputDepartmentSelect,
    SoloInputNationalitySelect,
    SoloInputNumberFromTo,
    SoloInputText
} from "../../../commonUI/SoloInput";

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
                from={{
                    value: filter.credit.from,
                    onChange: (value: ControlledNumber) => dispatchFilter(
                        {...filter, credit: {from: value, to: filter.credit.to}}),
                }}
                to={{
                    value: filter.credit.to,
                    onChange: (value: ControlledNumber) => dispatchFilter(
                        {...filter, credit: {from: filter.credit.from, to: value}}),
                }}
            />
            <SoloInputNumberFromTo
                label="Registrable Year"
                from={{
                    value: filter.registrableYear.from,
                    onChange: (value: ControlledNumber) => dispatchFilter(
                        {...filter, registrableYear: {from: value, to: filter.registrableYear.to}}),
                }}
                to={{
                    value: filter.registrableYear.to,
                    onChange: (value: ControlledNumber) => dispatchFilter(
                        {...filter, registrableYear: {from: filter.registrableYear.from, to: value}}),
                }}
            />
            <SoloInputText
                label="Name"
                value={filter.name}
                onChange={(value: string) => dispatchFilter({...filter, name: value})}
            />
            <SoloInputDepartmentSelect
                value={filter.department}
                onChange={(value: string) => dispatchFilter({...filter, nationality: value})}
            />
            <AsyncButton isLoading={isListFetching} onClick={triggerListRefresh}>Refresh List</AsyncButton>
        </ListPageFilter>
    )
}
