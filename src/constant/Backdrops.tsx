import React from "react";
import LoginPage from "../features/auth/LoginPage";
import { SubjectAdd, SubjectDelete, SubjectEdit, SubjectRate } from "../features/subject";
import { TeacherAdd } from "../features/teacher";

const Backdrops = () => {
  return (
    <>
      <LoginPage />

      <SubjectAdd />
      <SubjectEdit />
      <SubjectDelete />
      <SubjectRate />

      <TeacherAdd />
    </>
  );
};

export default Backdrops;
