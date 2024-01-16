import {ListPageFilter} from "../../../layout/ListPageFilter";
import {
    SoloInputGenderSelect,
    SoloInputNationalitySelect,
    SoloInputNumberFromTo,
    SoloInputText
} from "../../../commonUI/SoloInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherListFilter as TeacherListFilterProps, teacherReduxActions} from "../../../app/teacherSlice";
import React from "react";
import {TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {ALL} from "../../../constant/common";
import {ControlledNumber} from "../../../common/WrapperType";

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
            <SoloInputGenderSelect
                value={filter.gender}
                onChange={(value: string) => dispatchFilter({...filter, gender: value})}
            />
            <SoloInputNationalitySelect
                value={filter.nationality}
                onChange={(value: string) => dispatchFilter({...filter, nationality: value})}
            />
            <SoloInputNumberFromTo
                label={texts.common.age}
                from={{
                    value: filter.ageFrom,
                    onChange: (value: ControlledNumber) => dispatchFilter({...filter, ageFrom: value}),
                }}
                to={{
                    value: filter.ageTo,
                    onChange: (value: ControlledNumber) => dispatchFilter({...filter, ageTo: value}),
                }}
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