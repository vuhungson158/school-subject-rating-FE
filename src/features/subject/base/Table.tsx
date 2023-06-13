import {
  Box,
  Button,
  Table as MuiTable,
  Paper,
  Switch,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TextFields } from "../../../language";
import { CustomedLink } from "../../../widget/CustomedLink";
import { StyledTableCell, StyledTableRow } from "../../../widget/StyledTable";
import { teacherMapSelector } from "../../teacher/base/slice";
import { Entity } from "./model";
import { subjectListAfterFilterSelector } from "./slice";

const Table = () => {
  const dispatch = useAppDispatch();
  const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
  const showedColumns: Array<keyof Entity> = useAppSelector((root: RootState) => root.subject.showedColumns);
  const subjectList: Array<Entity> = useAppSelector(subjectListAfterFilterSelector);
  const teacherMap = useAppSelector(teacherMapSelector);
  const concatTexts = { ...texts.model.subject.request, ...texts.model.base };

  const data: {
    header: Array<keyof Entity>;
    body: Array<Entity>;
  } = {
    header: showedColumns,
    body: subjectList,
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 700 }} aria-label="customized table">
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
                  <Button variant="contained" fullWidth>
                    add New
                  </Button>
                </CustomedLink>
              </StyledTableCell>
            </StyledTableRow>
            {data.body.map((row) => (
              <StyledTableRow key={row.id}>
                {data.header.map((column, index) => {
                  const subject = <CustomedLink to={`${row.id}`}>{row.name}</CustomedLink>;
                  const teacher = (
                    <CustomedLink to={`/teacher/${row.teacherId}`}>
                      {teacherMap[row.teacherId as keyof typeof teacherMap]}
                    </CustomedLink>
                  );
                  const require = <Switch disabled checked={row.require} />;

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

export { Filter } from "./tableComponents/Filter";
export { Paginator } from "./tableComponents/Paginator";
export { ShowColumnController } from "./tableComponents/ShowColumnController";
export default Table;
