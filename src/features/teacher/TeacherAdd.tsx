import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import TeacherForm from "./TeacherForm";
import { teacherActions } from "./teacherSlice";
import { teacherThunk } from "./teacherThunk";

const TeacherAdd = () => {
  const dispatch = useAppDispatch();
  const addBackdropOpen = useAppSelector(
    (root: RootState) => root.teacher.addBackdropOpen,
  );

  return (
    <Dialog
      open={addBackdropOpen}
      onClose={() => dispatch(teacherActions.setAddBackdropOpen(false))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          Add a Teacher
        </DialogTitle>
        <TeacherForm
          onSubmit={(teacherRequest) => {
            return dispatch(teacherThunk.add(teacherRequest));
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TeacherAdd;
