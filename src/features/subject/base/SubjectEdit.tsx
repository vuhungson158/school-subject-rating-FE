import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { SubjectForm } from "./";
import { subjectActions } from "./subjectSlice";
import { subjectThunk } from "./subjectThunk";

export const SubjectEdit = () => {
  const dispatch = useAppDispatch();
  const editId = useAppSelector((root: RootState) => root.subject.editId) as number;
  const editSubject = useAppSelector(
    (root: RootState) => root.subject.subjectList,
  ).find((subject) => subject.id === editId);

  return (
    <Dialog
      open={!!editId}
      onClose={() => dispatch(subjectActions.setEditId(undefined))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          Edit Subject
        </DialogTitle>
        <SubjectForm
          subject={editSubject}
          onSubmit={(subject) => dispatch(subjectThunk.edit(editId, subject))}
        />
      </DialogContent>
    </Dialog>
  );
};
