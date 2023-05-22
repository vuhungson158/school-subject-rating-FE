import SendIcon from "@mui/icons-material/Send";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Button, CircularProgress, FormLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TextNumber } from "../../../formFields";
import { PrivateButton } from "../../auth";
import { Permission } from "../../auth/Role";
import { Request, WithLikeCount } from "./model";
import { Entity } from "./react/model";
import reactThunk from "./react/thunk";
import thunk from "./thunk";

const Comment = () => {
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
        reactThunk.getByUserIdAndCommentIdList(
          userId,
          commentList.list.map((item) => item.id),
        ),
      );
    }
  }, [dispatch, userId, commentList.list]);

  useEffect(() => {
    if (subjectId) {
      dispatch(thunk.fetchTopBySubjectId(Number(subjectId), 10, 0));
      if (userId) {
        dispatch(thunk.fetchBySubjectIdAndUserId(Number(subjectId), userId));
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
            <Form
              comment={comment}
              onSubmit={(commentRequest) => {
                if (isUpdate) {
                  dispatch(
                    thunk.edit(comment?.id as number, {
                      userId: userId as number,
                      subjectId: Number(subjectId),
                      comment: commentRequest.comment,
                    }),
                  );
                  setIsUpdate(false);
                } else {
                  dispatch(
                    thunk.add({
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
            <CommentWiget
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
              <CommentWiget
                key={index}
                comment={comment}
                isReacting={isReacting}
                userReact={userReact}
                onLikeClick={(comment, userReact) => {
                  if (userReact && userReact.react === true) {
                    dispatch(reactThunk.delete(userReact));
                  } else if (userReact && userReact.react === false) {
                    dispatch(
                      reactThunk.update(userReact.id, {
                        react: true,
                        commentId: userReact.commentId,
                        userId: userReact.userId,
                      }),
                    );
                  } else {
                    dispatch(
                      reactThunk.add({
                        commentId: comment.id,
                        userId: userId as number,
                        react: true,
                      }),
                    );
                  }
                }}
                onDislikeClick={(comment, userReact) => {
                  if (userReact && userReact.react === false) {
                    dispatch(reactThunk.delete(userReact));
                  } else if (userReact && userReact.react === true) {
                    dispatch(
                      reactThunk.update(userReact.id, {
                        react: false,
                        commentId: userReact.commentId,
                        userId: userReact.userId,
                      }),
                    );
                  } else {
                    dispatch(
                      reactThunk.add({
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

const CommentWiget = ({
  comment,
  ofUser,
  isReacting,
  onLikeClick,
  onDislikeClick,
  userReact,
}: {
  comment: WithLikeCount;
  ofUser?: boolean;
  isReacting: boolean;
  onLikeClick: (comment: WithLikeCount, userReact?: Entity) => void;
  onDislikeClick: (comment: WithLikeCount, userReact?: Entity) => void;
  userReact?: Entity;
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

const Form = ({
  comment,
  onSubmit,
}: {
  comment?: WithLikeCount;
  onSubmit: (comment: Request) => void;
}) => {
  const isLoading = useAppSelector(
    (state: RootState) => state.subjectComment.isLoading,
  );

  const initValue: Request = comment || {
    userId: 0,
    subjectId: 0,
    comment: "",
  };

  const { control, handleSubmit } = useForm<Request>({
    defaultValues: initValue,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextNumber
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

export default Comment;
