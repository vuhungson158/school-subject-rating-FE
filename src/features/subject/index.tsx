import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../common";
import Base from "./base";
import Detail from "./base/Detail";
import Form from "./base/Form";
import Plan from "./plan";

const Subject = () => {
  return (
    <Box>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Base />}>
          <Route path="/:mode" element={<Form />} />
          <Route path="/:mode/:id" element={<Form />} />
        </Route>
        <Route path="/plan" element={<Plan />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </Box>
  );
};
export default Subject;
