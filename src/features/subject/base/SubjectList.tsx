import {Box, Paper, TableContainer} from "@mui/material";
import {SubjectEntity, initSubjectEntity} from "./subjectModel";

const SubjectList = () => {

    return (
        <Box>
            <Buttons/>
            <Table/>
        </Box>
    )
}

const Buttons = () => {
    return <></>;
}

const Table = () => {
    const subjectDataList: Array<SubjectEntity> = [];
    const headers = initSubjectEntity;
    const hasData: boolean = !!subjectDataList;

    return (
        <TableContainer component={Paper}>

        </TableContainer>
    )
}

export default SubjectList;