import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Tooltip } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { teacherActions } from "./teacherSlice";

const TeacherList = () => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <AddButton
        title="New Subject"
        onClick={() => dispatch(teacherActions.setAddBackdropOpen(true))}
      />
      <div>TeacherList</div>
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
