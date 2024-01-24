import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import TeacherListFilter from "./TeacherListFilter";
import TeacherListTable from "./TeacherListTable";
import TeacherListPaginator from "./TeacherListPaginator";
import {TeacherAddButton} from "./TeacherAddPopup";

const TeacherListPage = () => {
    return (
        <Box>
            <TeacherListFilter/>
            <TeacherAddButton/>
            <TeacherListTable/>
            <TeacherListPaginator/>
            <Outlet/>
        </Box>
    )
}

export default TeacherListPage;