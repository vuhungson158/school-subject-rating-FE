import {Link, Outlet} from "react-router-dom";
import {Box, Button} from "@mui/material";
import TeacherListFilter from "./TeacherListFilter";
import TeacherListTable from "./TeacherListTable";
import TeacherListPaginator from "./TeacherListPaginator";
import {PopMode} from "../../../model/commonModel";

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


const TeacherAddButton = () => {
    return (
        <Link to={PopMode.add}>
            <Button variant="outlined" color="primary" fullWidth>
                Add New
            </Button>
        </Link>
    )
}

export default TeacherListPage;