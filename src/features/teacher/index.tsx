import { Route, Routes } from "react-router-dom";
import { NotFound } from "../common/NotFound";
import { Detail } from "./base/Detail";
import { List } from "./base/List";

const Teacher = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
};
export default Teacher;
