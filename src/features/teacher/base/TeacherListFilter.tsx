import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Box, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {ListPageFilter} from "../../../layout/ListPageFilter";
import {SoloInputText} from "../../../commonUI/SoloInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TeacherListFilterProps, teacherReduxActions} from "../../../app/teacherSlice";
import React from "react";

const TeacherListFilter = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const filter: TeacherListFilterProps = useAppSelector((root: RootState) => root.teacher.filter);

    const dispatchFilter = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const value: string = event.target.value;
        dispatch(teacherReduxActions.setFilter({...filter, value}))
    }

    return (
        <ListPageFilter>
            <SoloInputText
                label="Name (or Furigana)"
                value={filter.name}
                onChange={
                    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        const value: string = event.target.value;
                        dispatch(teacherReduxActions.setFilter({...filter, value}))
                    }
                }
            />
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select label="Gender">
                <MenuItem value="">All</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select label="Nationality">
                <MenuItem value="">All</MenuItem>
            </Select>
            <Box display="flex" alignItems="center">
                <TextField label="Age (from)"/>
                <ArrowRightIcon/>
                <TextField label="Age (to)"/>
            </Box>
        </ListPageFilter>
    )
}

export default TeacherListFilter;