import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { teacherRatingActions, teacherRatingThunk } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { SliderField, StarField } from "../../../formFields";
import { TeacherRatingRequest } from "../../../model";

export const TeacherRatingForm = () => {
  const dispatch = useAppDispatch();
  const teacherId = useAppSelector(
    (root: RootState) => root.teacherRating.teacherId,
  ) as number;
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);
  const rating = useAppSelector((root: RootState) => root.teacherRating.rating);
  const teacher = useAppSelector((root: RootState) =>
    root.teacher.teacherList.find((teacher) => teacher.id === teacherId),
  );

  return (
    <Dialog
      open={!!teacherId}
      onClose={() => dispatch(teacherRatingActions.setTeacherId(undefined))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          {rating ? "Update rating" : "Rate Teacher"}
          <Typography variant="h4" component="p" color="Highlight">
            {teacher?.name}
          </Typography>
        </DialogTitle>
        <RateForm
          rating={rating}
          onSubmit={(ratingRequest) =>
            rating
              ? dispatch(
                  teacherRatingThunk.edit(rating.id as number, {
                    ...ratingRequest,
                    userId: userId as number,
                    teacherId: teacherId,
                  }),
                )
              : dispatch(
                  teacherRatingThunk.add({
                    ...ratingRequest,
                    userId: userId as number,
                    teacherId: teacherId,
                  }),
                )
          }
        />
      </DialogContent>
    </Dialog>
  );
};

interface RateFormInterface {
  rating?: TeacherRatingRequest;
  onSubmit: (formValues: TeacherRatingRequest) => void;
}

const RateForm = ({ rating, onSubmit }: RateFormInterface) => {
  const isLoading = useAppSelector((state: RootState) => state.teacher.isLoading);

  const initValue: TeacherRatingRequest = rating || {
    userId: 0,
    teacherId: 0,
    enthusiasm: 0,
    erudition: 0,
    friendly: 0,
    nonConservatism: 0,
    pedagogicalLevel: 0,
    star: 0,
  };

  const { control, handleSubmit } = useForm<TeacherRatingRequest>({
    defaultValues: initValue,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SliderField name="enthusiasm" label="Enthusiasm" control={control} />
        <SliderField name="erudition" label="Erudition" control={control} />
        <SliderField name="friendly" label="Friendly" control={control} />
        <SliderField
          name="nonConservatism"
          label="Non Conservatism"
          control={control}
        />
        <SliderField name="pedagogicalLevel" label="Pedagogical Level" control={control} />
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
