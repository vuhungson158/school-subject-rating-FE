import { Box, FormLabel, Rating, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { subjectRatingActions, subjectRatingThunk } from "../";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { Permission, SubjectRatingGraphKeys } from "../../../model";
import { PrivateButton } from "../../auth";
import { ColumnGraph } from "../../common";

export const SubjectRating = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isRatingLoading = useAppSelector(
    (root: RootState) => root.subjectRating.isLoading,
  );
  const averageRating = useAppSelector(
    (root: RootState) => root.subjectRating.averageRating,
  );
  const rating = useAppSelector((root: RootState) => root.subjectRating.rating);
  const subject = useAppSelector((root: RootState) =>
    root.subject.subjectList.find((subject) => subject.id === Number(id)),
  );
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);

  const columns = [];
  if (averageRating)
    columns.push({
      label: "Average",
      backgroundColor: "#6200ea",
      values: SubjectRatingGraphKeys.map(
        (key) => averageRating[key as keyof typeof averageRating],
      ) as number[],
    });
  if (rating)
    columns.push({
      label: "Your",
      backgroundColor: "#424242",
      values: SubjectRatingGraphKeys.map(
        (key) => rating[key as keyof typeof rating],
      ) as number[],
    });

  useEffect(() => {
    if (id) {
      dispatch(subjectRatingThunk.fetchAverageBySubjectId(Number(id)));
      if (userId) {
        dispatch(subjectRatingThunk.fetchBySubjectIdAndUserId(Number(id), userId));
      }
    }
  }, [dispatch, id, userId]);
  
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
        subject &&
        averageRating && (
          <Box>
            <ColumnGraph
              title={`${subject.name} (Total Rating: ${averageRating.total})`}
              data={{
                label: SubjectRatingGraphKeys,
                columns,
              }}
            />
            <Box display="flex" justifyContent="end">
              <Rating
                sx={{ marginX: 4, cursor: "default" }}
                name="customized-10"
                value={averageRating.star}
                max={10}
                precision={0.1}
                readOnly
              />
              <FormLabel>{averageRating.star} star</FormLabel>
            </Box>
            <PrivateButton
              permission={Permission.SUBJECT_RATING_CREATE}
              sx={{ marginTop: 4 }}
              onClick={() => dispatch(subjectRatingActions.setSubjectId(Number(id)))}
              fullWidth
              size="large"
              variant="contained"
              color="warning">
              {rating ? "Rate Again" : "Rate"}
            </PrivateButton>
          </Box>
        )
      )}
    </Box>
  );
};
