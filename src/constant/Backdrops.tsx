import { Box } from "@mui/material";
import { LoginPage, UserResign } from "../features/auth";
import {
  FormDetail,
  SubjectRatingForm
} from "../features/subject";
import { TeacherForm, TeacherRatingForm } from "../features/teacher";

export const Backdrops = () => {
  return (
    <Box>
      <LoginPage />
      <UserResign />

      <FormDetail />
      <SubjectRatingForm />

      <TeacherForm />
      <TeacherRatingForm />
    </Box>
  );
};
