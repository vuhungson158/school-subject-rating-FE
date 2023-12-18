import {ListPageFilter} from "../../../layout/ListPageFilter";
import {SoloInputGenderSelect, SoloInputText} from "../../../commonUI/SoloInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherListFilterProps, teacherReduxActions} from "../../../app/teacherSlice";
import React from "react";

const TeacherListFilter = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const filter: TeacherListFilterProps = useAppSelector((root: RootState) => root.teacher.filter);

    return (
        <ListPageFilter>
            <SoloInputText
                label="Name (or Furigana)"
                value={filter.name}
                onChange={(value: string) => dispatch(teacherReduxActions.setFilter({...filter, name: value}))}
            />
            <SoloInputGenderSelect
                value={filter.gender}
                onChange={(value: string) => dispatch(teacherReduxActions.setFilter({...filter, gender: value}))}
            />
            {/*<InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
            {/*<Select label="Gender">*/}
            {/*    <MenuItem value="">All</MenuItem>*/}
            {/*</Select>*/}
            {/*<InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
            {/*<Select label="Nationality">*/}
            {/*    <MenuItem value="">All</MenuItem>*/}
            {/*</Select>*/}
            {/*<Box display="flex" alignItems="center">*/}
            {/*    <TextField label="Age (from)"/>*/}
            {/*    <ArrowRightIcon/>*/}
            {/*    <TextField label="Age (to)"/>*/}
            {/*</Box>*/}
        </ListPageFilter>
    )
}

export default TeacherListFilter;