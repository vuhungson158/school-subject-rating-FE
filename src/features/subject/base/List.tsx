import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Pagination,
  TextField,
  Tooltip
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { RadioGroup, Select, TextNumber } from "../../../formFields";
import { SpecializeLanguage, SubjectRequestLanguage } from "../../../language";
import { PrivateElement } from "../../auth";
import { Permission } from "../../auth/Role";
import { CustomedLink, DeleteDialog, TableList } from "../../common";
import { selectObject as selectTeacherObject } from "../../teacher/base/slice";
import { Entity, EntityKeys, Request } from "./model";
import { actions, selectSubjectListAfterFilter } from "./slice";
import thunk from "./thunk";

export const List = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const isLoading = useAppSelector((root: RootState) => root.subject.isLoading);
  const { limit, page } = useAppSelector(
    (root: RootState) => root.subject.pagination,
  );
  const subjectList = useAppSelector((root: RootState) => root.subject.list);
  const deleteId = useAppSelector((root: RootState) => root.subject.deleteId);
  const deleteSubject = useAppSelector(
    (root: RootState) =>
      root.subject.list.find((subject) => subject.id === deleteId) as Entity,
  );
  const teacherObj = useAppSelector(selectTeacherObject);
  const data = useAppSelector(selectSubjectListAfterFilter).map((subject) => ({
    ...subject,
    name: <CustomedLink to={`${subject.id}`}>{subject.name}</CustomedLink>,
    teacherId: (
      <CustomedLink to={`/teacher/${subject.teacherId}`}>
        {teacherObj[subject.teacherId as keyof typeof teacherObj]}
      </CustomedLink>
    ),
    specialize:
      texts.enum.specialize[subject.specialize as keyof SpecializeLanguage] ||
      subject.specialize,
    disable: <Checkbox checked={subject.disable as boolean} />,
  }));

  return (
    <Box>
      <PrivateElement permission={Permission.SUBJECT_CREATE}>
        <AddButton
          title="New Subject"
          onClick={() => dispatch(actions.setBackdropOpen(true))}
        />
      </PrivateElement>
      <SubjectFilter />
      <TableList
        header={EntityKeys}
        headerLabel={EntityKeys.map(
          (key) => texts.model.subject.request[key as keyof SubjectRequestLanguage],
        )}
        data={data}
        isLoading={isLoading}
        onEdit={(id: number) => dispatch(actions.setEditId(id))}
        onDelete={(id: number) => dispatch(actions.setDeleteId(id))}
      />
      <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
        <Pagination
          size="large"
          count={Math.ceil(data.length / limit)}
          page={page + 1}
          color="secondary"
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            dispatch(actions.setPagination({ limit, page: page - 1 }));
          }}
        />
        <Box>
          Limit: {limit} / Total: {subjectList.length}
        </Box>
      </Box>
      {deleteSubject && (
        <DeleteDialog
          open={!!deleteId}
          label={deleteSubject.name}
          onClose={() => dispatch(actions.setDeleteId(undefined))}
          onSubmit={() => dispatch(thunk.delete(deleteId as number))}
        />
      )}
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

const SubjectFilter = () => {
  const dispatch = useAppDispatch();
  const subjectList = useAppSelector((root: RootState) => root.subject.list);
  const teacherList = useAppSelector((root: RootState) => root.teacher.list);
  const filter = useAppSelector((root: RootState) => root.subject.filter);

  return (
    <Box marginBottom={4} display="flex" justifyContent="space-evenly">
      <Autocomplete
        value={filter.name}
        isOptionEqualToValue={(option, value) => true}
        onChange={(_, value) =>
          dispatch(actions.setFilter({ ...filter, name: value as string }))
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
          dispatch(actions.setFilter({ ...filter, teacher: value as string }))
        }
        freeSolo
        options={teacherList.map((teacher) => teacher.name)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Teacher Name" />}
      />
    </Box>
  );
};

export const Form = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((root: RootState) => root.subject.backdropOpen);
  const editId = useAppSelector((root: RootState) => root.subject.editId) as number;
  const editSubject = useAppSelector((root: RootState) => root.subject.list).find(
    (subject) => subject.id === editId,
  );

  return (
    <Dialog
      open={open || !!editId}
      onClose={() =>
        editId
          ? dispatch(actions.setEditId(undefined))
          : dispatch(actions.setBackdropOpen(false))
      }>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          {editSubject ? "Edit " + editSubject.name : "Add a Subject"}
        </DialogTitle>
        <AddEditForm
          subject={editSubject}
          onSubmit={(subject) =>
            editSubject
              ? dispatch(thunk.edit(editId, subject))
              : dispatch(thunk.add(subject))
          }
        />
      </DialogContent>
    </Dialog>
  );
};

interface FormProps {
  subject?: Request;
  onSubmit: (formValues: Request) => void;
}

const AddEditForm = ({ subject, onSubmit }: FormProps) => {
  const isLoading = useAppSelector((state: RootState) => state.subject.isLoading);
  const teacherList = useAppSelector((state: RootState) => state.teacher.list);

  const initValue: Request = subject || {
    name: "",
    formYear: 0,
    specialize: "BASIC",
    unit: 0,
    teacherId: 0,
  };

  const schema = object({
    name: string().min(2).required(),
    formYear: number().min(1).max(4).required(),
    unit: number().min(1).max(6).required(),
    teacherId: number().required(),
  }).required();

  const { control, handleSubmit } = useForm<Request>({
    defaultValues: initValue,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextNumber name="name" control={control} label="Subject Name" />
      <RadioGroup
        name="specialize"
        control={control}
        label="Specialize"
        options={[
          { value: "MANAGEMENT", label: "経営" },
          { value: "NETWORK", label: "ネットワーク" },
          { value: "BASIC", label: "基礎" },
        ]}
      />
      <TextNumber name="formYear" control={control} label="Year Able" />
      <TextNumber name="unit" control={control} label="Unit" />
      <Select
        name="teacherId"
        control={control}
        label="Teacher"
        options={teacherList.map((teacher) => ({
          value: teacher.id as number,
          label: teacher.name,
        }))}
      />

      <Button
        sx={{ marginTop: 4 }}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}>
        {isLoading ? <CircularProgress /> : "Submit"}
      </Button>
    </form>
  );
};
