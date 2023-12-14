import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Table, {Filter, Paginator} from "./Table";

const SubjectListPage = () => {
    return (
        <Box>
            <Filter/>
            <Table/>
            <Paginator/>
            <Outlet/>
        </Box>
    );
};

export default SubjectListPage;
