import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  Rating as MuiStar,
  Skeleton,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { FormInputSlider, FormInputStar } from "../../../HookFormInput";
import { TeacherRatingLanguage } from "../../../language";
import { PrivateButton } from "../../../auth";
import { Permission } from "../../../auth/Role";
import { ColumnGraph } from "../../../common";
import { GraphKeys, Request } from "./model";
import { actions } from "./slice";
import thunk from "./thunk";

const Rating = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const { id } = useParams();
  const isRatingLoading = useAppSelector(
    (root: RootState) => root.teacherRating.isLoading,
  );
  const averageRating = useAppSelector(
    (root: RootState) => root.teacherRating.average,
  );
  const rating = useAppSelector((root: RootState) => root.teacherRating.rating);
  const teacher = useAppSelector((root: RootState) =>
    root.teacher.list.find((teacher) => teacher.id === Number(id)),
  );
  const star = averageRating ? Math.round(averageRating?.star * 100) / 100 : 0;
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);

  const columns = [];
  if (averageRating)
    columns.push({
      label: "Average",
      backgroundColor: "#6200ea",
      values: GraphKeys.map(
        (key) => averageRating[key as keyof typeof averageRating],
      ) as number[],
    });
  if (rating)
    columns.push({
      label: "Your",
      backgroundColor: "#424242",
      values: GraphKeys.map((key) => rating[key as keyof typeof rating]) as number[],
    });

  useEffect(() => {
    if (id && !averageRating) {
      dispatch(thunk.fetchAverageByTeacherId(Number(id)));
      console.log({ userId, rating });
      if (userId && !rating) {
        dispatch(thunk.fetchByTeacherIdAndUserId(Number(id), userId));
      }
    }
  }, [dispatch, id, userId, averageRating, rating]);

  return (
    <Box>
      {isRatingLoading ? (
        <Skeleton
          sx={{ bgcolor: "default" }}
          variant="rectangular"
          height={500}
          animation="wave"
        />
      ) : (
        teacher && (
          <Box>
            <ColumnGraph
              title={`${teacher.name} (Total Rating: ${averageRating?.total || 0})`}
              data={{
                label: GraphKeys.map(
                  (key) =>
                    texts.model.teacher.rating[key as keyof TeacherRatingLanguage],
                ),
                columns,
              }}
            />
            <Box display="flex" justifyContent="end">
              <MuiStar
                sx={{ marginX: 4, cursor: "default" }}
                name="customized-10"
                value={star}
                max={10}
                precision={0.1}
                readOnly
              />
              <FormLabel>
                {star + " "}
                {texts.model.teacher.rating.star}
              </FormLabel>
            </Box>
          </Box>
        )
      )}
      <PrivateButton
        permission={Permission.SUBJECT_RATING_CREATE}
        sx={{ marginTop: 4 }}
        onClick={() => dispatch(actions.setTeacherId(Number(id)))}
        fullWidth
        size="large"
        variant="contained"
        color="warning">
        {rating ? "Rate Again" : "Rate"}
      </PrivateButton>
    </Box>
  );
};

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
        <FormDetail
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

interface FormInterface {
  rating?: Request;
  onSubmit: (formValues: Request) => void;
}

const FormDetail = ({ rating, onSubmit }: FormInterface) => {
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

export default Rating;
