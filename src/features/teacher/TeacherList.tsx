import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { keyofTeacherEntity } from "../../model";
import { List } from "../common/List";
import { teacherActions } from "./teacherSlice";
import { teacherThunk } from "./teacherThunk";

const TeacherList = () => {
  const dispatch = useAppDispatch();
  const teacherList = useAppSelector((root: RootState) => root.teacher.teacherList);
  const isLoading = useAppSelector((root: RootState) => root.teacher.isLoading);

  useEffect(() => {
    dispatch(teacherThunk.fetchAll());
  }, [dispatch]);

  return (
    <Box>
      <AddButton
        title="New Subject"
        onClick={() => dispatch(teacherActions.setAddBackdropOpen(true))}
      />
      <List
        header={keyofTeacherEntity}
        data={teacherList}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
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

export default TeacherList;
