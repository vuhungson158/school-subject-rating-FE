import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import TeacherListFilter from "./TeacherListFilter";
import TeacherListTable from "./TeacherListTable";
import TeacherListPaginator from "./TeacherListPaginator";
import {TeacherAddButton} from "./TeacherAddPopup";

export const TeacherListPage = () => {
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