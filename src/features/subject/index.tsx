import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../common";
import { Detail } from "./base/Detail";
import { List } from "./base/List";
import Plan from "./plan";

const Subject = () => {
  return (
    <Box>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<List />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </Box>
  );
};
export default Subject;
