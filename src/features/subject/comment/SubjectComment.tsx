import SendIcon from "@mui/icons-material/Send";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { CommentWithLikeCount } from "../../../model";

export const SubjectComment = () => {
  const dispatch = useAppDispatch();
  const comment = useAppSelector((root: RootState) => root.subjectComment.comment);

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
      {comment ? (
        <TextField
          label="Your Comment"
          variant="outlined"
          fullWidth
          focused
          multiline
          color="warning"
          sx={{ marginBottom: 8 }}
          InputProps={{
            readOnly: true,
          }}
        />
      ) : (
        <Box display="flex" marginBottom={8}>
          <TextField
            label="Your Comment"
            variant="outlined"
            fullWidth
            focused
            multiline
            color="warning"
            sx={{ marginRight: 4 }}
          />
          <Button variant="outlined" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      )}

      {fakeComment.map((comment) => (
        <Comment comment={comment} />
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

const CommentForm = ({ comment }: { comment: CommentWithLikeCount }) => {};
