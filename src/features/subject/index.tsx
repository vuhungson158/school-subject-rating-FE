import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../layout/NotFound";
import { StudentList } from "./StudentList";

const index = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<StudentList />} />
      {/* <Route element={<PrivateRoute />}>
        <Route path="/add" element={<Add />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/edit/:id" element={<Edit />} />
      </Route> */}
    </Routes>
  );
};

export default index;
