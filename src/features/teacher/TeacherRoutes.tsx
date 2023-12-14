import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../../page/NotFoundPage";
import { Detail } from "./base/Detail";
import { List } from "./base/List";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
};
export default TeacherRoutes;
