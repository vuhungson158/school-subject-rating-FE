import React from "react";
import LoginPage from "../features/auth/LoginPage";
import { SubjectAdd, SubjectDelete, SubjectEdit, SubjectRating } from "../features/subject";
import { TeacherAdd } from "../features/teacher";

const Backdrops = () => {
  return (
    <>
      <LoginPage />

      <SubjectAdd />
      <SubjectEdit />
      <SubjectDelete />
      <SubjectRating />

      <TeacherAdd />
    </>
  );
};

export default Backdrops;
