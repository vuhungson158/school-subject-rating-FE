import {Box, Button, Paper, TableContainer} from "@mui/material";
import {SubjectEntity, subjectEntityKeys} from "../../../model/subjectModel";
import {TableBody, TableHeader, TableSkeleton} from "../../../ui/Table";
import {Filter} from "./tableComponents/Filter";
import {PopMode} from "../../../model/commonModel";
import {Link} from "react-router-dom";

const SubjectList = () => {

    return (
        <Box>
            <Buttons/>
            <Table/>
        </Box>
    )
}

const Buttons = () => {
    return (
        <Box>
            <Filter/>
            <Sorter/>
            <AddNew/>
        </Box>
    )
}


const Filter = () => {
    return (
        <Box>
        </Box>
    )
}

const Sorter = () => {
    return (
        <Box>
        </Box>
    )
}

const AddNew = () => {
    return (
        <Link to={PopMode.add}>
            <Button variant="contained" color="primary">
                Add New
            </Button>
        </Link>
    )
}

const Table = () => {
    const subjectDataList: Array<SubjectEntity> = [];
    const headers: string[] = subjectEntityKeys;
    const hasData: boolean = !!subjectDataList;

    return (
        <TableContainer component={Paper}>
            <TableHeader headers={headers}/>
            {hasData ? <TableBody data={subjectDataList}/> : <TableSkeleton headers={headers}/>}
        </TableContainer>
    )
}

export default SubjectList;