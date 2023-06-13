import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Table, { Filter, Paginator, ShowColumnController } from "./Table";

const Base = () => {
  return (
    <Box>
      <Filter />
      <ShowColumnController />
      <Table />
      <Paginator />
      <Outlet />
    </Box>
  );
};

export default Base;
