import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../layout/NotFound";
import { SubjectDetail } from "./SubjectDetail";
import { SubjectList } from "./SubjectList";

const index = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<SubjectList />} />
      <Route path="/:id" element={<SubjectDetail />} />
    </Routes>
  );
};

export default index;
