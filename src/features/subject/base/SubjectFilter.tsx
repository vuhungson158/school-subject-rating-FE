import { Autocomplete, Box, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { subjectActions } from "./subjectSlice";

export interface Filter {
  name: string;
  teacher: string;
}

export const SubjectFilter = () => {
  const dispatch = useAppDispatch();
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const teacherList = useAppSelector((root: RootState) => root.teacher.teacherList);
  const filter = useAppSelector((root: RootState) => root.subject.filter);

  return (
    <Box marginBottom={4} display="flex" justifyContent="space-evenly">
      <Autocomplete
        value={filter.name}
        isOptionEqualToValue={(option, value) => true}
        onChange={(_, value) =>
          dispatch(subjectActions.setFilter({ ...filter, name: value as string }))
        }
        freeSolo
        options={subjectList.map((subject) => subject.name)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Subject Name" />}
      />
      <Autocomplete
        value={filter.teacher}
        isOptionEqualToValue={(option, value) => true}
        onChange={(_, value) =>
          dispatch(subjectActions.setFilter({ ...filter, teacher: value as string }))
        }
        freeSolo
        options={teacherList.map((teacher) => teacher.name)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Teacher Name" />}
      />
    </Box>
  );
};
