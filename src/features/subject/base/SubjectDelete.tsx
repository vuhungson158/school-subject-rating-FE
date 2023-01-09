import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { subjectActions } from "./subjectSlice";
import { subjectThunk } from "./subjectThunk";

export const SubjectDelete = () => {
  const dispatch = useAppDispatch();
  const deleteId = useAppSelector(
    (root: RootState) => root.subject.deleteId,
  ) as number;
  const deleteSubject = useAppSelector(
    (root: RootState) => root.subject.subjectList,
  ).find((subject) => subject.id === deleteId);

  return (
    <Dialog
      open={!!deleteId}
      onClose={() => dispatch(subjectActions.setDeleteId(undefined))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          <Typography variant="h3" component="span" color="red">
            DELETE
          </Typography>{" "}
          Subject{" "}
          <Typography variant="h3" component="h3" color="Highlight">
            {deleteSubject?.name}
          </Typography>
        </DialogTitle>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={() => dispatch(subjectThunk.delete(deleteId))}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};
