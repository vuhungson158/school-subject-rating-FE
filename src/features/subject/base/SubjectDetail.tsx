import { Button, FormLabel, Rating, Skeleton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TextFields } from "../../../language";
import { SubjectEntity, SubjectRatingGraphKeys } from "../../../model";
import { ColumnGraph } from "../../common/ColumnGraph";
import { SubjectComment } from "../comment/SubjectComment";
import { subjectRatingActions } from "../rating/subjectRatingSlice";
import { subjectRatingThunk } from "../rating/subjectRatingThunk";

export const SubjectDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const rating = useAppSelector((root: RootState) => root.subjectRating.rating);
  const isRatingLoading = useAppSelector(
    (root: RootState) => root.subjectRating.isLoading,
  );
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);
  const averageRating = useAppSelector(
    (root: RootState) => root.subjectRating.averageRating,
  );
  const subject = subjectList.find(
    (subject) => subject.id === Number(id),
  ) as SubjectEntity;

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
    dispatch(
      subjectRatingThunk.fetchBySubjectIdAndUserId(Number(id), userId as number),
    );
    dispatch(subjectRatingThunk.fetchAverageBySubjectId(Number(id)));
  }, [dispatch, id, userId]);

  return (
    <>
      {subject && (
        <Box>
          {isRatingLoading ? (
            <Skeleton
              sx={{ bgcolor: "default" }}
              variant="rectangular"
              height={500}
              animation="wave"
            />
          ) : (
            averageRating && (
              <>
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
              </>
            )
          )}
          <Button
            sx={{ marginTop: 4 }}
            onClick={() => dispatch(subjectRatingActions.setSubjectId(Number(id)))}
            fullWidth
            size="large"
            variant="contained"
            color="warning">
            {rating ? "Rate Again" : "Rate"}
          </Button>
          <Profile subject={subject} texts={texts} />
          <SubjectComment />
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
        sx={{
          width: { sm: 200, md: 300 },
          marginX: 4,
          paddingLeft: 4,
        }}
        size="medium"
        color="success"
        margin="normal"
        variant="standard"
        focused
        label={texts[key as keyof TextFields] || key}
        value={subject[key as keyof typeof subject]}
      />
    ))}
  </Box>
);
