import AddIcon from "@mui/icons-material/Add";
import { Box, Checkbox, Fab, Pagination, styled, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { TextFields } from "../../language";
import { keyofSubjectEntity } from "../../model";
import { List } from "../common/List";
import { subjectActions } from "./subjectSlice";
import { subjectThunk } from "./subjectThunk";

export const SubjectList = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((root: RootState) => root.subject.isLoading);
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const { limit, page } = useAppSelector((root: RootState) => root.subject.filter);

  const data = subjectList
    .slice(page * limit, (page + 1) * limit)
    .map((subject) => ({
      ...subject,
      name: <CustomedLink to={`${subject.id}`}>{subject.name}</CustomedLink>,
      teacherId: (
        <CustomedLink to={`/teacher/${subject.teacherId}`}>
          {subject.teacherId}
        </CustomedLink>
      ),
      specialize: texts[subject.specialize as keyof TextFields],
      disable: <Checkbox checked={subject.disable} />,
    }));

  useEffect(() => {
    dispatch(subjectThunk.fetchAll());
  }, [dispatch]);

  return (
    <Box>
      <AddButton
        title="New Subject"
        onClick={() => dispatch(subjectActions.setAddBackdropOpen(true))}
      />
      <List
        header={keyofSubjectEntity}
        data={data}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <Box mt={2} mb={1} display="flex" justifyContent="center">
        <Pagination
          size="large"
          count={Math.ceil(subjectList.length / limit)}
          page={page + 1}
          color="secondary"
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            dispatch(subjectActions.setPage(page - 1));
          }}
        />
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
