import { Box } from "@mui/material";
import { LoginPage, UserResign } from "../features/auth";
import {
  SubjectForm,
  SubjectRatingForm
} from "../features/subject";
import { TeacherAdd } from "../features/teacher";

export const Backdrops = () => {
  return (
    <Box>
      <LoginPage />
      <UserResign />

      <SubjectForm />
      <SubjectRatingForm />

      <TeacherAdd />
    </Box>
  );
};
