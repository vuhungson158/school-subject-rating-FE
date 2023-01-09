import { Button, Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { TextFields } from "../../language";
import { BaseEntity } from "../../model";

interface Props {
  data: BaseEntity[];
  header: string[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const List = ({ data, header, isLoading, onEdit, onDelete }: Props) => {
  const notBaseEntityField = (value: string): boolean =>
    !["id", "createdAt", "updatedAt", "disable"].includes(value);
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const tableBody = data.map((row, index) => (
    <StyledTableRow key={index}>
      {Object.entries(row).map(
        ([key, value], valueIndex) =>
          notBaseEntityField(key) && (
            <StyledTableCell key={valueIndex} align="center">
              {value as React.ReactNode}
            </StyledTableCell>
          ),
      )}
      <StyledTableCell align="center">
        <Button
          variant="outlined"
          color="success"
          onClick={() => onEdit(row.id as number)}>
          {texts.edit}
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(row.id as number)}>
          {texts.delete}
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  ));
  const skeletonBody = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
    <StyledTableRow key={index}>
      {header.map((_, valueIndex) => (
        <StyledTableCell key={valueIndex} align="center">
          <Skeleton animation="pulse" />
        </StyledTableCell>
      ))}
      <StyledTableCell align="center">
        <Skeleton animation="wave" />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Skeleton animation="wave" />
      </StyledTableCell>
    </StyledTableRow>
  ));

  const tableHeader = data.length ? Object.keys(data[0]) : header;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHeader.map(
              (key, index) =>
                notBaseEntityField(key) && (
                  <StyledTableCell key={index} align="center">
                    {texts[key as keyof TextFields] || key}
                  </StyledTableCell>
                ),
            )}
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="center">#</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{isLoading ? skeletonBody : tableBody}</TableBody>
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
  whiteSpace: "nowrap",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
