import { Box, FormLabel, Rating, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { teacherRatingActions, teacherRatingThunk } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TeacherRatingI } from "../../../language";
import { Permission, TeacherRatingGraphKeys } from "../../../model";
import { PrivateButton } from "../../auth";
import { ColumnGraph } from "../../common";

export const TeacherRating = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const { id } = useParams();
  const isRatingLoading = useAppSelector(
    (root: RootState) => root.teacherRating.isLoading,
  );
  const averageRating = useAppSelector(
    (root: RootState) => root.teacherRating.averageRating,
  );
  const rating = useAppSelector((root: RootState) => root.teacherRating.rating);
  const teacher = useAppSelector((root: RootState) =>
    root.teacher.teacherList.find((teacher) => teacher.id === Number(id)),
  );
  const star = averageRating ? Math.round(averageRating?.star * 100) / 100 : 0;
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);

  const columns = [];
  if (averageRating)
    columns.push({
      label: "Average",
      backgroundColor: "#6200ea",
      values: TeacherRatingGraphKeys.map(
        (key) => averageRating[key as keyof typeof averageRating],
      ) as number[],
    });
  if (rating)
    columns.push({
      label: "Your",
      backgroundColor: "#424242",
      values: TeacherRatingGraphKeys.map(
        (key) => rating[key as keyof typeof rating],
      ) as number[],
    });

  useEffect(() => {
    if (id && !averageRating) {
      dispatch(teacherRatingThunk.fetchAverageByTeacherId(Number(id)));
      console.log({ userId, rating });
      if (userId && !rating) {
        dispatch(teacherRatingThunk.fetchByTeacherIdAndUserId(Number(id), userId));
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
                label: TeacherRatingGraphKeys.map(
                  (key) => texts.model.teacher.rating[key as keyof TeacherRatingI],
                ),
                columns,
              }}
            />
            <Box display="flex" justifyContent="end">
              <Rating
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
        onClick={() => dispatch(teacherRatingActions.setTeacherId(Number(id)))}
        fullWidth
        size="large"
        variant="contained"
        color="warning">
        {rating ? "Rate Again" : "Rate"}
      </PrivateButton>
    </Box>
  );
};
