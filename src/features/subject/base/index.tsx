import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Table, {Filter, Paginator, ShowColumnController} from "./Table";

const Base = () => {
    return (
        <Box>
            <Box display="flex" justifyContent="space-evenly" marginBottom={2}>
                <Filter/>
                <ShowColumnController/>
            </Box>
            <Table/>
            <Paginator/>
            <Outlet/>
        </Box>
    );
};

export default Base;
