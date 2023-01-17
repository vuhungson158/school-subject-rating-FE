import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { subjectRatingActions, subjectRatingThunk } from "../";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { SliderField, StarField } from "../../../formFields";
import { SubjectRatingRequest } from "../../../model";

export const SubjectRatingForm = () => {
  const dispatch = useAppDispatch();
  const subjectId = useAppSelector(
    (root: RootState) => root.subjectRating.subjectId,
  ) as number;
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);
  const rating = useAppSelector((root: RootState) => root.subjectRating.rating);
  const subject = useAppSelector((root: RootState) =>
    root.subject.subjectList.find((subject) => subject.id === subjectId),
  );

  return (
    <Dialog
      open={!!subjectId}
      onClose={() => dispatch(subjectRatingActions.setSubjectId(undefined))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          {rating ? "Update rating" : "Rate Subject"}
          <Typography variant="h4" component="p" color="Highlight">
            {subject?.name}
          </Typography>
        </DialogTitle>
        <RateForm
          rating={rating}
          onSubmit={(ratingRequest) =>
            rating
              ? dispatch(
                  subjectRatingThunk.edit(rating.id as number, {
                    ...ratingRequest,
                    userId: userId as number,
                    subjectId: subjectId,
                  }),
                )
              : dispatch(
                  subjectRatingThunk.add({
                    ...ratingRequest,
                    userId: userId as number,
                    subjectId: subjectId,
                  }),
                )
          }
        />
      </DialogContent>
    </Dialog>
  );
};

interface RateFormInterface {
  rating?: SubjectRatingRequest;
  onSubmit: (formValues: SubjectRatingRequest) => void;
}

const RateForm = ({ rating, onSubmit }: RateFormInterface) => {
  const isLoading = useAppSelector((state: RootState) => state.subject.isLoading);

  const initValue: SubjectRatingRequest = rating || {
    userId: 0,
    subjectId: 0,
    practicality: 0,
    difficult: 0,
    homework: 0,
    teacherPedagogical: 0,
    testDifficult: 0,
    star: 0,
  };

  const { control, handleSubmit } = useForm<SubjectRatingRequest>({
    defaultValues: initValue,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SliderField name="practicality" label="Practicality" control={control} />
        <SliderField name="difficult" label="difficult" control={control} />
        <SliderField name="homework" label="homework" control={control} />
        <SliderField
          name="teacherPedagogical"
          label="Teacher Pedagogical"
          control={control}
        />
        <SliderField name="testDifficult" label="Test Difficult" control={control} />
        <StarField name="star" label="Star" control={control} />
        <Button
          sx={{ marginTop: 4 }}
          fullWidth
          type="submit"
          variant="contained"
          color="warning"
          disabled={isLoading}>
          {isLoading ? <CircularProgress /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
};
