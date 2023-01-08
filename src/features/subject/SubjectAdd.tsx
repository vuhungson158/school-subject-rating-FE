import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import SubjectForm from "./SubjectForm";
import { subjectActions } from "./subjectSlice";

export const SubjectAdd = () => {
  const dispatch = useAppDispatch();
  const addBackdropOpen = useAppSelector(
    (root: RootState) => root.subject.addBackdropOpen,
  );

  return (
    <Dialog
      open={addBackdropOpen}
      onClose={() => dispatch(subjectActions.setAddBackdropOpen(false))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          Add a Subject
        </DialogTitle>
        <SubjectForm />
      </DialogContent>
    </Dialog>
  );
};
