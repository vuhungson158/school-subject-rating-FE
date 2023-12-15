import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {Autocomplete, Box, TextField} from "@mui/material";
import {subjectActions} from "../../../app/subjectSlice";
import React from "react";
import {SubjectEntity as SubjectEntity} from "../../../model/subjectModel";
import {TeacherResponseModel as TeacherEntity} from "../../../model/teacherModel";
import {PopUp} from "../../../commonUI";

export const Filter = () => {
    const dispatch = useAppDispatch();
    const subjectList: SubjectEntity[] = useAppSelector((root: RootState) => root.subject.list);
    const teacherList: TeacherEntity[] = useAppSelector((root: RootState) => root.teacher.list);
    const filter = useAppSelector((root: RootState) => root.subject.filter);

    return (
        <PopUp name="データのフィルター">
            <Box marginBottom={4} display="flex" justifyContent="space-evenly">
                <Autocomplete
                    value={filter.name}
                    isOptionEqualToValue={() => true}
                    onChange={(_, value) =>
                        dispatch(subjectActions.setFilter({
                            ...filter,
                            name: value as string
                        }))}
                    freeSolo
                    options={subjectList.map((subject) => subject.name)}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Subject Name"/>}
                />
                <Autocomplete
                    value={filter.teacher}
                    isOptionEqualToValue={() => true}
                    onChange={(_, value) =>
                        dispatch(subjectActions.setFilter({
                            ...filter,
                            teacher: value as string
                        }))}
                    freeSolo
                    options={teacherList.map((teacher) => teacher.name)}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Teacher Name"/>}
                />
            </Box>
        </PopUp>
    );
};