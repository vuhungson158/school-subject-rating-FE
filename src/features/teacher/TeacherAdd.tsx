import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { teacherActions, TeacherForm, teacherThunk } from "./";

export const TeacherAdd = () => {
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
