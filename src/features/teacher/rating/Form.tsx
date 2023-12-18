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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { FormInputSlider, FormInputStar } from "../../../HookFormInput";
import { Request } from "./model";
import { actions } from "./slice";
import thunk from "./thunk";

export const Form = () => {
  const dispatch = useAppDispatch();
  const teacherId = useAppSelector(
    (root: RootState) => root.teacherRating.teacherId,
  ) as number;
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);
  const rating = useAppSelector((root: RootState) => root.teacherRating.rating);
  const teacher = useAppSelector((root: RootState) =>
    root.teacher.list.find((teacher) => teacher.id === teacherId),
  );

  return (
    <Dialog
      open={!!teacherId}
      onClose={() => dispatch(actions.setTeacherId(undefined))}>
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
                  thunk.edit(rating.id as number, {
                    ...ratingRequest,
                    userId: userId as number,
                    teacherId: teacherId,
                  }),
                )
              : dispatch(
                  thunk.add({
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
  rating?: Request;
  onSubmit: (formValues: Request) => void;
}

const RateForm = ({ rating, onSubmit }: RateFormInterface) => {
  const isLoading = useAppSelector((state: RootState) => state.teacher.isLoading);

  const initValue: Request = rating || {
    userId: 0,
    teacherId: 0,
    enthusiasm: 0,
    erudition: 0,
    friendly: 0,
    nonConservatism: 0,
    pedagogicalLevel: 0,
    star: 0,
  };

  const { control, handleSubmit } = useForm<Request>({
    defaultValues: initValue,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputSlider name="enthusiasm" label="Enthusiasm" control={control} />
        <FormInputSlider name="erudition" label="Erudition" control={control} />
        <FormInputSlider name="friendly" label="Friendly" control={control} />
        <FormInputSlider name="nonConservatism" label="Non Conservatism" control={control} />
        <FormInputSlider
          name="pedagogicalLevel"
          label="Pedagogical Level"
          control={control}
        />
        <FormInputStar name="star" label="Star" control={control} />
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
