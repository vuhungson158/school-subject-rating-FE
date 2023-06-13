import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Tooltip
} from "@mui/material";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { RadioGroup, TextNumber } from "../../../formFields";
import { TeacherRequestLanguage } from "../../../language";
import { PrivateElement } from "../../auth";
import { Permission } from "../../auth/Role";
import { CustomedLink, TableList } from "../../common";
import { genders, nationalities } from "../../common/model";
import { keyofEntity, Request } from "./model";
import { actions, selectListAfterFilter } from "./slice";
import thunk from "./thunk";

export const List = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const teacherList = useAppSelector((root: RootState) => root.teacher.list);
  const pagination = useAppSelector((root: RootState) => root.teacher.pagination);
  const { limit, page } = pagination;
  const isLoading = useAppSelector((root: RootState) => root.teacher.isLoading);
  const allData = useAppSelector(selectListAfterFilter).map((teacher) => ({
    ...teacher,
    name: <CustomedLink to={`${teacher.id}`}>{teacher.name}</CustomedLink>,
  }));
  const data = allData.slice(page * limit, (page + 1) * limit);

  return (
    <Box>
      <PrivateElement permission={Permission.TEACHER_CREATE}>
        <AddButton
          title="New Teacher"
          onClick={() => dispatch(actions.setBackdropOpen(true))}
        />
      </PrivateElement>
      <Filter />
      <TableList
        header={keyofEntity}
        headerLabel={keyofEntity.map(
          (key) => texts.model.teacher.request[key as keyof TeacherRequestLanguage],
        )}
        data={data}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
        <Pagination
          size="large"
          count={Math.ceil(allData.length / limit)}
          page={page + 1}
          color="secondary"
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            dispatch(actions.setPagination({ ...pagination, page: page - 1 }));
          }}
        />
        <Box>
          Limit: {allData.length} / Total: {teacherList.length}
        </Box>
      </Box>
    </Box>
  );
};

const AddButton = ({ title, onClick }: { title: string; onClick?: () => void }) => (
  <Tooltip title={title} onClick={onClick}>
    <Fab
      sx={{ position: "fixed", top: 48, left: 36, zIndex: 1 }}
      className="fixed"
      color="secondary"
      aria-label="add"
      variant="circular">
      {<AddIcon fontSize="large" />}
    </Fab>
  </Tooltip>
);

const Filter = () => {
  const dispatch = useAppDispatch();
  const subjectList = useAppSelector((root: RootState) => root.subject.list);
  const teacherList = useAppSelector((root: RootState) => root.teacher.list);
  const filter = useAppSelector((root: RootState) => root.teacher.filter);

  return (
    <Box marginBottom={4}>
      <Grid container gap={2} justifyContent="space-evenly" alignItems="center">
        <Grid item sx={{ width: 300 }}>
          <Autocomplete
            value={filter.name}
            isOptionEqualToValue={(option, value) => true}
            onChange={(_, value) =>
              dispatch(actions.setFilter({ ...filter, name: value as string }))
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
              dispatch(actions.setFilter({ ...filter, subject: value as string }))
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
                  actions.setFilter({
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
                  actions.setFilter({
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
              dispatch(actions.clearFilter());
            }}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const TeacherForm = () => {
  const dispatch = useAppDispatch();
  const backdropOpen = useAppSelector(
    (root: RootState) => root.teacher.formOpen,
  );

  return (
    <Dialog
      open={backdropOpen}
      onClose={() => dispatch(actions.setBackdropOpen(false))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          Add a Teacher
        </DialogTitle>
        <Form
          onSubmit={(teacherRequest) => {
            return dispatch(thunk.add(teacherRequest));
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

interface FormInterface {
  onSubmit: (formValues: Request) => void;
}

const Form = ({ onSubmit }: FormInterface) => {
  const isLoading = useAppSelector((state: RootState) => state.teacher.isLoading);

  const initValue: Request = {
    name: "",
    gender: "MALE",
    nationality: "",
    dob: "",
  };

  const schema = object({
    name: string().min(4).required(),
    nationality: string().required(),
    dob: string()
      .trim()
      .matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "yyyy-mm-dd")
      .required(),
  }).required();

  const { control, handleSubmit } = useForm<Request>({
    defaultValues: initValue,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextNumber name="name" control={control} label="Teacher Name" />
      <RadioGroup
        name="gender"
        control={control}
        label="Gender"
        options={[
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Felmale" },
        ]}
      />
      <TextNumber name="nationality" control={control} label="Nationality" />
      <TextNumber name="dob" control={control} label="Date Of Birth" />

      <Button
        sx={{ marginTop: 4 }}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}>
        {isLoading ? <CircularProgress /> : "Add"}
      </Button>
    </form>
  );
};
