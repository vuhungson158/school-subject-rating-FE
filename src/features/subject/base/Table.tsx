import {
    Box,
    Button,
    Paper,
    Switch,
    Table as MuiTable,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {TextFields} from "../../../language";
import {CustomedLink, StyledTableCell, StyledTableRow} from "../../../widget";
import {teacherMapSelector} from "../../teacher/base/slice";
import {Entity} from "./model";
import {subjectListAfterFilterSelector} from "./slice";
import {PopMode} from "../../common/model";

const Table = () => {
    // const dispatch = useAppDispatch();
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const showedColumns = useAppSelector((root: RootState) => root.subject.showedColumns);
    const subjectList: Array<Entity> = useAppSelector(subjectListAfterFilterSelector);
    const teacherMap = useAppSelector(teacherMapSelector);
    const concatTexts = {...texts.model.subject.request, ...texts.model.base};

    const data: {
        header: Array<keyof Entity>;
        body: Array<Entity>;
    } = {
        header: Object.entries(showedColumns)
            .filter(([_, value]) => value)
            .map(([key]) => key as keyof Entity),
        body: subjectList,
    };

    return (
        <Box>
            <TableContainer component={Paper}>
                <MuiTable sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {data.header.map((column, index) => (
                                <StyledTableCell key={index} align="center">
                                    {column === "teacherId" ? texts.model.teacher.request.name : concatTexts[column]}
                                </StyledTableCell>
                            ))}
                            {/*<PrivateElement permission={Permission.SUBJECT_UPDATE}>*/}
                            {/*  <StyledTableCell align="center">#</StyledTableCell>*/}
                            {/*</PrivateElement>*/}
                            {/*<PrivateElement permission={Permission.SUBJECT_DELETE}>*/}
                            {/*  <StyledTableCell align="center">#</StyledTableCell>*/}
                            {/*</PrivateElement>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell colSpan={data.header.length} align="center">
                                <CustomedLink to="add">
                                    <Button variant="outlined" color="inherit" fullWidth>
                                        add New
                                    </Button>
                                </CustomedLink>
                            </StyledTableCell>
                        </StyledTableRow>
                        {data.body.map((row) => (
                            <StyledTableRow key={row.id}>
                                {data.header.map((column, index) => {
                                    const subject = <CustomedLink
                                        to={`${PopMode.detail}/${row.id}`}>{row.name}</CustomedLink>;
                                    const teacher = (
                                        <CustomedLink to={`/teacher/${row.teacherId}`}>
                                            {teacherMap[row.teacherId as keyof typeof teacherMap]}
                                        </CustomedLink>
                                    );
                                    const require = <Switch disabled checked={row.require}/>;

                                    return (
                                        <StyledTableCell key={index} align="center">
                                            {column === "name"
                                                ? subject
                                                : column === "teacherId"
                                                    ? teacher
                                                    : column === "department"
                                                        ? texts.enum.department[row.department]
                                                        : column === "require"
                                                            ? require
                                                            : (row[column] as string)}
                                        </StyledTableCell>
                                    );
                                })}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>

            {/*{deleteSubject && (*/}
            {/*  <DeleteDialog*/}
            {/*    open={!!deleteId}*/}
            {/*    label={deleteSubject.name}*/}
            {/*    onClose={() => dispatch(actions.setDeleteId(undefined))}*/}
            {/*    onSubmit={() => dispatch(thunk.delete(deleteId as number))}*/}
            {/*  />*/}
            {/*)}*/}
        </Box>
    );
};

export {Filter} from "./tableComponents/Filter";
export {Paginator} from "./tableComponents/Paginator";
export {ShowColumnController} from "./tableComponents/ShowColumnController";
export default Table;
