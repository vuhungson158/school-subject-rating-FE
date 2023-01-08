import React from "react";
import LoginPage from "../features/auth/LoginPage";
import { SubjectAdd } from "../features/subject/SubjectAdd";
import TeacherAdd from "../features/teacher/TeacherAdd";

const Backdrops = () => {
  return (
    <>
      <LoginPage />
      <SubjectAdd />
      <TeacherAdd />
    </>
  );
};

export default Backdrops;
