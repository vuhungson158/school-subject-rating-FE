import SendIcon from "@mui/icons-material/Send";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TextNumberField } from "../../../formFields";
import { CommentWithLikeCount, CommentRequest } from "../../../model";
import { subjectCommentThunk } from "./subjectCommentThunk";

export const SubjectComment = () => {
  const dispatch = useAppDispatch();
  const { id: subjectId } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const comment = useAppSelector((root: RootState) => root.subjectComment.comment);
  const userId = useAppSelector((root: RootState) => root.auth.user?.id);

  const fakeComment: FakeComment[] = [
    {
      userName: "Fake Name",
      content:
        "Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment ",
      like: Math.floor(Math.random() * 100),
      dislike: Math.floor(Math.random() * 100),
    },
    {
      userName: "Fake Name",
      content:
        "Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment ",
      like: Math.floor(Math.random() * 100),
      dislike: Math.floor(Math.random() * 100),
    },
    {
      userName: "Fake Name",
      content:
        "Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment ",
      like: Math.floor(Math.random() * 100),
      dislike: Math.floor(Math.random() * 100),
    },
    {
      userName: "Fake Name",
      content:
        "Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment Fake Comment ",
      like: Math.floor(Math.random() * 100),
      dislike: Math.floor(Math.random() * 100),
    },
  ];

  return (
    <Box>
      <Typography marginTop={2} textAlign="center" variant="h3" gutterBottom>
        Comment
      </Typography>
      {!comment || isUpdate ? (
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
          <TextField
            label={`Your Comment ( ${comment.displayName} )`}
            variant="outlined"
            value={comment.comment}
            fullWidth
            focused
            multiline
            color="warning"
            InputProps={{
              readOnly: true,
            }}
            margin="normal"
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
      )}

      {fakeComment.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </Box>
  );
};
interface FakeComment {
  userName: string;
  content: string;
  like: number;
  dislike: number;
}
const Comment = ({ comment }: { comment: FakeComment }) => {
  return (
    <Box marginY={2}>
      <TextField
        label={comment.userName}
        value={comment.content}
        variant="filled"
        fullWidth
        focused
        multiline
        color="secondary"
        InputProps={{
          readOnly: true,
        }}
      />
      <Box display="flex" justifyContent="end" alignItems="center" paddingX={4}>
        <IconButton>
          <ThumbUpIcon />
        </IconButton>
        <FormLabel sx={{ marginLeft: 1 }}>{comment.like}</FormLabel>
        <IconButton sx={{ marginLeft: 4 }}>
          <ThumbDownIcon />
        </IconButton>
        <FormLabel sx={{ marginLeft: 1 }}>{comment.dislike}</FormLabel>
      </Box>
    </Box>
  );
};

const CommentForm = ({
  comment,
  onSubmit,
}: {
  comment?: CommentWithLikeCount;
  onSubmit: (comment: CommentRequest) => void;
}) => {
  const isLoading = useAppSelector(
    (state: RootState) => state.subjectComment.isLoading,
  );

  const initValue: CommentRequest = comment || {
    userId: 0,
    subjectId: 0,
    comment: "",
  };

  const { control, handleSubmit } = useForm<CommentRequest>({
    defaultValues: initValue,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextNumberField
          name="comment"
          control={control}
          label={`Your Comment ( ${comment?.displayName} )`}
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
