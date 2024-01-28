import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import React from "react";
import {subjectReduxActions} from "../../../app/subjectSlice";
import {SubjectListFilter as SubjectListFilterProps} from "../../../model/subjectModel";
import {
    AsyncButton,
    NormalButton,
    SoloInputNumberFromTo,
    SoloInputTemplateLiteralSelect,
    SoloInputText
} from "../../../ui";
import {UndefinedFromTo} from "../../../model/commonModel";
import {Department, departments, YesNo, yesNos} from "../../../model/templateLiteral";
import {SmallClass, SmallEnum} from "../../../model/classificationModel";
import {FilterContainer} from "../../common/ListFilter";

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
        <FilterContainer>
            <SoloInputText
                label="Name"
                value={filter.name}
                onChange={(value?: string) => dispatchFilter({...filter, name: value})}
            />
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
            <SoloInputTemplateLiteralSelect
                label={"Department"}
                value={filter.department}
                options={departments}
                onSelected={(value?: Department) => dispatchFilter({...filter, department: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"classification"}
                value={filter.classification}
                options={Object.values(SmallEnum)}
                onSelected={(value?: SmallClass) => dispatchFilter({...filter, classification: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"classification"}
                value={filter.classification}
                options={Object.values(SmallEnum)}
                onSelected={(value?: SmallClass) => dispatchFilter({...filter, classification: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Require"}
                value={filter.require === true ? "YES" : filter.require === false ? "NO" : undefined}
                options={yesNos}
                onSelected={(value?: YesNo) => dispatchFilter(
                    {...filter, require: value === "YES" ? true : value === "NO" ? false : undefined})}
            />
            <NormalButton size="large" onClick={() => dispatch(subjectReduxActions.clearFilter())}>Clear
                Filter</NormalButton>
            <AsyncButton isLoading={isListFetching} onClick={triggerListRefresh}>Refresh List</AsyncButton>
        </FilterContainer>
    )
}
