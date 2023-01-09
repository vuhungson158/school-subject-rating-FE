import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../../layout/NotFound";
import { SubjectList, SubjectDetail } from "../";

export const Subject = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<SubjectList />} />
      <Route path="/:id" element={<SubjectDetail />} />
    </Routes>
  );
};
