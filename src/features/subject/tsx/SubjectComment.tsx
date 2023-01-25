import SendIcon from "@mui/icons-material/Send";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Button, CircularProgress, FormLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { subjectCommentReactThunk, subjectCommentThunk } from "../";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TextNumberField } from "../../../formFields";
import {
  SubjectCommentReactEntity,
  SubjectCommentRequest,
  SubjectCommentWithLikeCount,
  Permission,
} from "../../../model";
import { PrivateButton } from "../../auth";

export const SubjectComment = () => {
  const dispatch = useAppDispatch();
  const { id: subjectId } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const comment = useAppSelector((root: RootState) => root.subjectComment.comment);
  const commentList = useAppSelector(
    (root: RootState) => root.subjectComment.commentList,
  );
  const userId = useAppSelector((root: RootState) => root.auth.user?.id) as number;
  const isReacting = useAppSelector(
    (root: RootState) => root.subjectComment.isReacting,
  );
  const userReactList = useAppSelector(
    (root: RootState) => root.subjectComment.userReactList,
  );

  useEffect(() => {
    if (commentList.list.length > 0 && userId) {
      dispatch(
        subjectCommentReactThunk.getByUserIdAndCommentIdList(
          userId,
          commentList.list.map((item) => item.id),
        ),
      );
    }
  }, [dispatch, userId, commentList.list]);

  useEffect(() => {
    if (subjectId) {
      dispatch(subjectCommentThunk.fetchTopBySubjectId(Number(subjectId), 10, 0));
      if (userId) {
        dispatch(
          subjectCommentThunk.fetchBySubjectIdAndUserId(Number(subjectId), userId),
        );
      }
    }
  }, [dispatch, userId, subjectId]);

  return (
    <Box>
      <Typography marginTop={2} textAlign="center" variant="h3" gutterBottom>
        Comment
      </Typography>
      {userId ? (
        !comment || isUpdate ? (
          <Box marginBottom={8}>
            <CommentForm
              comment={comment}
              onSubmit={(commentRequest) => {
                if (isUpdate) {
                  dispatch(
                    subjectCommentThunk.edit(comment?.id as number, {
                      userId: userId as number,
                      subjectId: Number(subjectId),
                      comment: commentRequest.comment,
                    }),
                  );
                  setIsUpdate(false);
                } else {
                  dispatch(
                    subjectCommentThunk.add({
                      userId: userId as number,
                      subjectId: Number(subjectId),
                      comment: commentRequest.comment,
                    }),
                  );
                }
              }}
            />
            <Button
              fullWidth
              size="large"
              variant="outlined"
              color="warning"
              sx={{ marginTop: 1 }}
              onClick={() => {
                setIsUpdate(false);
              }}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ marginBottom: 8 }}>
            <Comment
              comment={comment}
              ofUser
              isReacting={false}
              onLikeClick={() => {}}
              onDislikeClick={() => {}}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="outlined"
              onClick={() => {
                setIsUpdate(true);
              }}>
              Update Your Comment
            </Button>
          </Box>
        )
      ) : (
        ""
      )}

      <Box>
        {commentList.list.map((comment, index) => {
          const userReact =
            comment && userReactList.find((react) => react.commentId === comment.id);
          return (
            comment &&
            comment.userId !== userId && (
              <Comment
                key={index}
                comment={comment}
                isReacting={isReacting}
                userReact={userReact}
                onLikeClick={(comment, userReact) => {
                  if (userReact && userReact.react === true) {
                    dispatch(subjectCommentReactThunk.delete(userReact));
                  } else if (userReact && userReact.react === false) {
                    dispatch(
                      subjectCommentReactThunk.update(userReact.id, {
                        react: true,
                        commentId: userReact.commentId,
                        userId: userReact.userId,
                      }),
                    );
                  } else {
                    dispatch(
                      subjectCommentReactThunk.add({
                        commentId: comment.id,
                        userId: userId as number,
                        react: true,
                      }),
                    );
                  }
                }}
                onDislikeClick={(comment, userReact) => {
                  if (userReact && userReact.react === false) {
                    dispatch(subjectCommentReactThunk.delete(userReact));
                  } else if (userReact && userReact.react === true) {
                    dispatch(
                      subjectCommentReactThunk.update(userReact.id, {
                        react: false,
                        commentId: userReact.commentId,
                        userId: userReact.userId,
                      }),
                    );
                  } else {
                    dispatch(
                      subjectCommentReactThunk.add({
                        commentId: comment.id,
                        userId: userId as number,
                        react: false,
                      }),
                    );
                  }
                }}
              />
            )
          );
        })}
      </Box>
      <Box display="flex" justifyContent="end">
        Total Comment: {commentList.total}
      </Box>
    </Box>
  );
};

const Comment = ({
  comment,
  ofUser,
  isReacting,
  onLikeClick,
  onDislikeClick,
  userReact,
}: {
  comment: SubjectCommentWithLikeCount;
  ofUser?: boolean;
  isReacting: boolean;
  onLikeClick: (
    comment: SubjectCommentWithLikeCount,
    userReact?: SubjectCommentReactEntity,
  ) => void;
  onDislikeClick: (
    comment: SubjectCommentWithLikeCount,
    userReact?: SubjectCommentReactEntity,
  ) => void;
  userReact?: SubjectCommentReactEntity;
}) => {
  return (
    <Box marginY={2} sx={{ border: "1px solid #333", borderRadius: 4 }}>
      <Typography
        paddingX={2}
        paddingTop={2}
        variant="subtitle2"
        color={ofUser ? "primary" : "secondary"}>
        {comment.displayName} {ofUser && "(Your comment)"}
      </Typography>
      <Typography variant="h6" marginX={4} overflow="scroll">
        <pre style={{ fontFamily: "inherit", margin: 0, whiteSpace: "pre-wrap" }}>
          {comment.comment}
        </pre>
      </Typography>
      <Box
        display="flex"
        justifyContent="end"
        alignContent="center"
        paddingX={4}
        paddingBottom={1}>
        {isReacting ? (
          <CircularProgress />
        ) : (
          <PrivateButton
            permission={Permission.COMMENT_REACT_CREATE}
            disabled={ofUser}
            onClick={() => {
              onLikeClick(comment, userReact);
            }}>
            <ThumbUpIcon
              color={
                userReact?.react === true ? "info" : ofUser ? "disabled" : "action"
              }
            />
          </PrivateButton>
        )}
        <FormLabel sx={{ marginLeft: 1, alignSelf: "center" }}>
          {comment.likeCount}
        </FormLabel>
        {isReacting ? (
          <CircularProgress sx={{ marginLeft: 4 }} />
        ) : (
          <PrivateButton
            permission={Permission.COMMENT_REACT_CREATE}
            disabled={ofUser}
            onClick={() => {
              onDislikeClick(comment, userReact);
            }}
            sx={{ marginLeft: 4 }}>
            <ThumbDownIcon
              color={
                userReact?.react === false ? "info" : ofUser ? "disabled" : "action"
              }
            />
          </PrivateButton>
        )}
        <FormLabel sx={{ marginLeft: 1, alignSelf: "center" }}>
          {comment.dislikeCount}
        </FormLabel>
      </Box>
    </Box>
  );
};

const CommentForm = ({
  comment,
  onSubmit,
}: {
  comment?: SubjectCommentWithLikeCount;
  onSubmit: (comment: SubjectCommentRequest) => void;
}) => {
  const isLoading = useAppSelector(
    (state: RootState) => state.subjectComment.isLoading,
  );

  const initValue: SubjectCommentRequest = comment || {
    userId: 0,
    subjectId: 0,
    comment: "",
  };

  const { control, handleSubmit } = useForm<SubjectCommentRequest>({
    defaultValues: initValue,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextNumberField
          name="comment"
          control={control}
          label={`Your Comment ( ${comment ? comment?.displayName : ""} )`}
          multiline
          color="warning"
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="outlined"
          endIcon={<SendIcon />}
          disabled={isLoading}>
          {isLoading ? <CircularProgress /> : "Sent"}
        </Button>
      </Box>
    </form>
  );
};
