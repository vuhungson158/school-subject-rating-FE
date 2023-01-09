import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../layout/NotFound";
import { TeacherList } from "./";

export const Teacher = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<TeacherList />} />
      {/* <Route path="/:id" element={<SubjectDetail />} /> */}
    </Routes>
  );
};
