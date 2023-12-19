import {ListPageFilter} from "../../../layout/ListPageFilter";
import {
    SoloInputGenderSelect,
    SoloInputNationalitySelect,
    SoloInputNumberFromTo,
    SoloInputText
} from "../../../commonUI/SoloInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherListFilterProps, teacherReduxActions} from "../../../app/teacherSlice";
import React from "react";
import {TextFields} from "../../../language";

const TeacherListFilter = () => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const dispatch: AppDispatch = useAppDispatch();
    const filter: TeacherListFilterProps = useAppSelector((root: RootState) => root.teacher.filter);
    const dispatchFilter = (filter: TeacherListFilterProps) => dispatch(teacherReduxActions.setFilter(filter));

    return (
        <ListPageFilter>
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
                    onChange: (value?: number) => dispatchFilter({...filter, ageFrom: value}),
                }}
                to={{
                    value: filter.ageTo,
                    onChange: (value?: number) => dispatchFilter({...filter, ageTo: value}),
                }}
            />
        </ListPageFilter>
    )
}

export default TeacherListFilter;