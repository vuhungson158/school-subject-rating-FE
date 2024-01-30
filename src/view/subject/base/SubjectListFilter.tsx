import React from "react";
import {
    AsyncButton,
    JustifyBox,
    NormalButton,
    SoloInputNumberFromTo,
    SoloInputTemplateLiteralSelect,
    SoloInputText
} from "../../../ui";
import {UndefinedFromTo} from "../../../model/commonModel";
import {Department, departments, YesNo, yesNos} from "../../../model/templateLiteral";
import {SmallClass, SmallEnum} from "../../../model/classificationModel";
import {FilterContainer, UseFilterReturn} from "../../common/ListFilter";
import {AppDispatch} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {triggerReduxActions} from "../../../app/triggerSlice";

export interface SubjectListFilterModel {
    name?: string;
    credit: UndefinedFromTo<number>;
    registrableYear: UndefinedFromTo<number>;
    department?: Department;
    classification?: SmallClass;
    require?: boolean;
}

export const subjectFilterInitValue: SubjectListFilterModel = {
    name: undefined,
    credit: {
        from: undefined,
        to: undefined,
    },
    registrableYear: {
        from: undefined,
        to: undefined,
    },
    department: undefined,
    classification: undefined,
    require: undefined,
}

type SubjectListFilterProps = { isLoading: boolean } & UseFilterReturn<SubjectListFilterModel>;

const SubjectListFilter = ({
    filter, setFilterPartially, reset, isLoading
}: SubjectListFilterProps) => {
    const dispatch: AppDispatch = useAppDispatch();
    const triggerListRefresh = () => dispatch(triggerReduxActions.refreshList("subjectList"));

    return (
        <FilterContainer>
            <SoloInputText
                label="Name"
                value={filter.name}
                onChange={(value?: string) => setFilterPartially({name: value})}
            />
            <SoloInputNumberFromTo
                label="Credit"
                value={filter.credit}
                onChange={(value: UndefinedFromTo<number>) => setFilterPartially({credit: value})}
            />
            <SoloInputNumberFromTo
                label="Registrable Year"
                value={filter.registrableYear}
                onChange={(value: UndefinedFromTo<number>) => setFilterPartially({registrableYear: value})}

            />
            <SoloInputTemplateLiteralSelect
                label={"Department"}
                value={filter.department}
                options={departments}
                onSelected={(value?: Department) => setFilterPartially({department: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"classification"}
                value={filter.classification}
                options={Object.values(SmallEnum)}
                onSelected={(value?: SmallClass) => setFilterPartially({classification: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Require"}
                value={filter.require === true ? "YES" : filter.require === false ? "NO" : undefined}
                options={yesNos}
                onSelected={(value?: YesNo) => setFilterPartially(
                    {require: value === "YES" ? true : value === "NO" ? false : undefined})}
            />
            <JustifyBox>
                <NormalButton size="large" onClick={reset}>Clear Filter</NormalButton>
                <AsyncButton size="large" isLoading={isLoading} onClick={triggerListRefresh}>Refresh List</AsyncButton>
            </JustifyBox>
        </FilterContainer>
    )
}

const propsEqualWhen = (
    prevProps: Readonly<SubjectListFilterProps>,
    nextProps: Readonly<SubjectListFilterProps>
): boolean => {
    return prevProps.filter === nextProps.filter && prevProps.isLoading === nextProps.isLoading;
}

export default React.memo(SubjectListFilter, propsEqualWhen)