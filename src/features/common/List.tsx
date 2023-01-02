import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

interface Props {
  data: {}[];
  onEdit: () => void;
  onDelete: () => void;
}

export const List = ({ data, onEdit, onDelete }: Props) => {
  const texts = useAppSelector((root: RootState) => root.common.texts);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((key, index) => (
              <StyledTableCell key={index} align="center">
                {key}
              </StyledTableCell>
            ))}
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="center">#</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              {Object.values(row).map((values, valueIndex) => (
                <StyledTableCell key={valueIndex} align="center">
                  {values as React.ReactNode}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">
                <Button variant="outlined" color="success" onClick={onEdit}>
                  {texts.edit}
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button variant="outlined" color="error" onClick={onDelete}>
                  {texts.delete}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
