import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import TeacherListFilter from "./TeacherListFilter";
import TeacherListTable from "./TeacherListTable";
import TeacherListPaginator from "./TeacherListPaginator";

const TeacherListPage = () => {
    return (
        <Box>
            <TeacherListFilter/>
            <TeacherListTable/>
            <TeacherListPaginator/>
            <Outlet/>
        </Box>
    )
}

export default TeacherListPage;