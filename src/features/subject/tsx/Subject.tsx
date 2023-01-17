import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { SubjectDetail, SubjectList } from "../";
import { NotFound } from "../../../features/common";

export const Subject = () => {
  return (
    <Box>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<SubjectList />} />
        <Route path="/:id" element={<SubjectDetail />} />
      </Routes>
    </Box>
  );
};
