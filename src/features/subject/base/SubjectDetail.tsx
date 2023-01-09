import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { TextFields } from "../../language";
import { SubjectEntity } from "../../model";
import { ColumnGraph } from "../common/ColumnGraph";
import { subjectActions } from "./subjectSlice";

export const SubjectDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const averageRating = useAppSelector(
    (root: RootState) => root.subject.averageRating,
  );
  const subject = subjectList.find(
    (subject) => subject.id === Number(id),
  ) as SubjectEntity;

  return (
    <>
      {subject && (
        <Box>
          <ColumnGraph title={`${subject.name}`} averageRating={averageRating} />
          <Button
            onClick={() => dispatch(subjectActions.setRateSubjectId(Number(id)))}
            fullWidth
            size="large"
            variant="contained"
            color="warning">
            Rate
          </Button>
          <Profile subject={subject} texts={texts} />
        </Box>
      )}
    </>
  );
};

const Profile = ({
  subject,
  texts,
}: {
  subject: SubjectEntity;
  texts: TextFields;
}) => (
  <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
    {Object.keys(subject).map((key) => (
      <TextField
        key={key}
        InputProps={{
          readOnly: true,
        }}
        sx={{ width: { sm: 200, md: 300 }, marginX: 4 }}
        size="medium"
        color="success"
        margin="normal"
        focused
        label={texts[key as keyof TextFields] || key}
        value={subject[key as keyof typeof subject]}
      />
    ))}
  </Box>
);
