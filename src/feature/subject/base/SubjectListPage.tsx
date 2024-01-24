import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {SubjectListFilter} from "./SubjectListFilter";
import {SubjectAddButton} from "./SubjectAddPopup";
import {SubjectListTable} from "./SubjectListTable";
import {SubjectListPaginator} from "./SubjectListPaginator";

export const SubjectListPage = () => {
    return (
        <Box>
            <SubjectListFilter/>
            <SubjectAddButton/>
            <SubjectListTable/>
            <SubjectListPaginator/>
            <Outlet/>
        </Box>
    );
};