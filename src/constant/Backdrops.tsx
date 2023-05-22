import { Box } from "@mui/material";
import { LoginPage, UserResign } from "../features/auth";

export const Backdrops = () => {
  return (
    <Box>
      <LoginPage />
      <UserResign />

      {/* <FormDetail />
      <SubjectRatingForm />

      <TeacherForm />
      <TeacherRatingForm /> */}
    </Box>
  );
};
