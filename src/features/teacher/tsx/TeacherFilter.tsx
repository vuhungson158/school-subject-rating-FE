import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { genders, nationalities } from "../../../model";
import { teacherActions } from "../ts/teacherSlice";

export const TeacherFilter = () => {
  const dispatch = useAppDispatch();
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const teacherList = useAppSelector((root: RootState) => root.teacher.teacherList);
  const filter = useAppSelector((root: RootState) => root.teacher.filter);

  return (
    <Box marginBottom={4}>
      <Grid container gap={2} justifyContent="space-evenly" alignItems="center">
        <Grid item sx={{ width: 300 }}>
          <Autocomplete
            value={filter.name}
            isOptionEqualToValue={(option, value) => true}
            onChange={(_, value) =>
              dispatch(
                teacherActions.setFilter({ ...filter, name: value as string }),
              )
            }
            freeSolo
            options={teacherList.map((teacher) => teacher.name)}
            renderInput={(params) => <TextField {...params} label="Teacher Name" />}
          />
        </Grid>
        <Grid item sx={{ width: 300 }}>
          <Autocomplete
            value={filter.subject}
            isOptionEqualToValue={(option, value) => true}
            onChange={(_, value) =>
              dispatch(
                teacherActions.setFilter({ ...filter, subject: value as string }),
              )
            }
            freeSolo
            options={subjectList.map((subject) => subject.name)}
            renderInput={(params) => <TextField {...params} label="Subject Name" />}
          />
        </Grid>
        <Grid item sx={{ width: 300 }}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={filter.gender}
              label="Gender"
              onChange={(event) => {
                dispatch(
                  teacherActions.setFilter({
                    ...filter,
                    gender: event.target.value as string,
                  }),
                );
              }}>
              <MenuItem value="">All</MenuItem>
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: 300 }}>
          <FormControl fullWidth>
            <InputLabel>Nationality</InputLabel>
            <Select
              value={filter.nationality}
              label="Nationality"
              onChange={(event) => {
                dispatch(
                  teacherActions.setFilter({
                    ...filter,
                    nationality: event.target.value as string,
                  }),
                );
              }}>
              <MenuItem value="">All</MenuItem>
              {nationalities.map((nationality) => (
                <MenuItem key={nationality} value={nationality}>
                  {nationality}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: 300 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(teacherActions.clearFilter());
            }}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
