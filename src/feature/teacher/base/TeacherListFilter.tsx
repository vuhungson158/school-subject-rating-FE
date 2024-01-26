import {FilterContainer} from "../../../ui/table/FilterContainer";
import {NormalButton, SoloInputNumberFromTo, SoloInputTemplateLiteralSelect, SoloInputText} from "../../../ui";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherListFilter as TeacherListFilterProps, teacherReduxActions} from "../../../app/teacherSlice";
import React from "react";
import {TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {Gender, genders, nationalities, Nationality} from "../../../model/templateLiteral";
import {UndefinedFromTo} from "../../../model/commonModel";

const TeacherListFilter = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const filter: TeacherListFilterProps = useAppSelector((root: RootState) => root.teacher.filter);

    const dispatchFilter = (filter: TeacherListFilterProps): void => {
        dispatch(teacherReduxActions.setFilter(filter))
    };

    return (
        <FilterContainer>
            <SoloInputText
                label={`${texts.model.teacher.name} (or Furigana)`}
                value={filter.name}
                onChange={(value?: string) => dispatchFilter({...filter, name: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Gender"}
                value={filter.gender}
                options={genders}
                onSelected={(value?: Gender) => dispatchFilter({...filter, gender: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Nationality"}
                value={filter.nationality}
                options={nationalities}
                onSelected={(value?: Nationality) => dispatchFilter({...filter, nationality: value})}
            />
            <SoloInputNumberFromTo
                label={texts.common.age}
                value={filter.age}
                onChange={(value: UndefinedFromTo<number>) => dispatchFilter({...filter, age: value})}
            />
            <NormalButton size="large" onClick={() => dispatch(teacherReduxActions.clearFilter())}>Clear
                Filter</NormalButton>
        </FilterContainer>
    )
}

export const teacherListAfterFilter = (root: RootState): TeacherResponseModel[] => {
    const teacherList: TeacherResponseModel[] = root.teacher.list;
    const filter: TeacherListFilterProps = root.teacher.filter;
    return teacherList.filter(
        (teacher: TeacherResponseModel): boolean => {
            return (filter.name ? (teacher.name.includes(filter.name) || teacher.furigana.includes(filter.name)) : true)
                && (filter.gender ? teacher.gender === filter.gender : true)
                && (filter.nationality ? teacher.nationality === filter.nationality : true)
                && (filter.age.from ? filter.age.from <= teacher.age : true)
                && (filter.age.to ? teacher.age <= filter.age.to : true)
        }
    );
}

export default TeacherListFilter;