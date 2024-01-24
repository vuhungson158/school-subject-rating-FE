import {ListPageFilter} from "../../../ui/ListPageFilter";
import {SoloInputNumberFromTo, SoloInputTemplateLiteralSelect, SoloInputText} from "../../../ui/SoloInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherListFilter as TeacherListFilterProps, teacherReduxActions} from "../../../app/teacherSlice";
import React from "react";
import {TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {ControlledNumber} from "../../../common/WrapperType";
import {Gender, genders, nationalities, Nationality} from "../../../model/templateLiteral";

const TeacherListFilter = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const filter: TeacherListFilterProps = useAppSelector((root: RootState) => root.teacher.filter);

    const dispatchFilter = (filter: TeacherListFilterProps): void => {
        dispatch(teacherReduxActions.setFilter(filter))
    };

    return (
        <ListPageFilter onClear={() => dispatch(teacherReduxActions.clearFilter())}>
            <SoloInputText
                label={`${texts.model.teacher.name} (or Furigana)`}
                value={filter.name}
                onChange={(value: string) => dispatchFilter({...filter, name: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Gender"}
                value={filter.gender}
                options={genders}
                onChange={(value?: Gender) => dispatchFilter({...filter, gender: value})}
            />
            <SoloInputTemplateLiteralSelect
                label={"Nationality"}
                value={filter.nationality}
                options={nationalities}
                onChange={(value?: Nationality) => dispatchFilter({...filter, nationality: value})}
            />
            <SoloInputNumberFromTo
                label={texts.common.age}
                value={filter.ageFrom}
            />
        </ListPageFilter>
    )
}

export const teacherListAfterFilter = (root: RootState): TeacherResponseModel[] => {
    const teacherList: TeacherResponseModel[] = root.teacher.list;
    const filter: TeacherListFilterProps = root.teacher.filter;
    return teacherList.filter(
        (teacher: TeacherResponseModel): boolean => {
            return (teacher.name.includes(filter.name) || teacher.furigana.includes(filter.name))
                && (filter.gender === ALL || teacher.gender === filter.gender)
                && (filter.nationality === ALL || teacher.nationality === filter.nationality)
                && (filter.ageFrom === "" ? true : filter.ageFrom <= teacher.age)
                && (filter.ageTo === "" ? true : teacher.age <= filter.ageTo)
        }
    );
}

export default TeacherListFilter;