import AddIcon from "@mui/icons-material/Add";
import { Box, Checkbox, Fab, Pagination, styled, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TextFields } from "../../../language";
import { BaseEntity, SubjectEntityKeys } from "../../../model";
import { List } from "../../common/List";
import { selectTeacherObject } from "../../teacher/teacherSlice";
import { SubjectFilter } from "./SubjectFilter";
import { subjectActions } from "./subjectSlice";

interface DataList extends BaseEntity {
  name: JSX.Element;
  teacherId: JSX.Element;
  unit: number;
  formYear: number;
  specialize: string;
}

export const SubjectList = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((root: RootState) => root.subject.isLoading);
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const { limit, page, name, teacher } = useAppSelector(
    (root: RootState) => root.subject.filter,
  );
  const teacherObj = useAppSelector(selectTeacherObject);

  const data = subjectList
    .filter((subject) => {
      let valid = true;
      if (name && !subject.name.includes(name)) valid = false;
      if (
        teacher &&
        teacherObj[subject.teacherId as keyof typeof teacherObj] !== teacher
      )
        valid = false;
      return valid;
    })
    .slice(page * limit, (page + 1) * limit)
    .map<DataList>((subject) => ({
      ...subject,
      name: <CustomedLink to={`${subject.id}`}>{subject.name}</CustomedLink>,
      teacherId: (
        <CustomedLink to={`/teacher/${subject.teacherId}`}>
          {teacherObj[subject.teacherId as keyof typeof teacherObj]}
        </CustomedLink>
      ),
      specialize:
        texts[subject.specialize as keyof TextFields] || subject.specialize,
      disable: <Checkbox checked={subject.disable as boolean} />,
    }));

  return (
    <Box>
      <AddButton
        title="New Subject"
        onClick={() => dispatch(subjectActions.setAddBackdropOpen(true))}
      />
      <SubjectFilter />
      <List
        header={SubjectEntityKeys}
        data={data}
        isLoading={isLoading}
        onEdit={(id: number) => dispatch(subjectActions.setEditId(id))}
        onDelete={(id: number) => dispatch(subjectActions.setDeleteId(id))}
      />
      <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
        <Pagination
          size="large"
          count={Math.ceil(subjectList.length / limit)}
          page={page + 1}
          color="secondary"
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            dispatch(subjectActions.setPage(page - 1));
          }}
        />
        <Box>
          Limit: {limit} / Total: {subjectList.length}
        </Box>
      </Box>
    </Box>
  );
};

const CustomedLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.dark,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
}));

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
