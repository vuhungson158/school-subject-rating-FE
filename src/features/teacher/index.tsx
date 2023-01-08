import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../layout/NotFound";
import TeacherList from "./TeacherList";

const index = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<TeacherList />} />
      {/* <Route path="/:id" element={<SubjectDetail />} /> */}
    </Routes>
  );
};

export default index;
