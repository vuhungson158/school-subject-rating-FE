import {Button, Paper, Skeleton, styled, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import * as React from "react";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {PrivateElement} from "../auth";
import {Permission} from "../auth/Role";
import {BaseEntity} from "./model";
import {StyledTableCell} from "../widget";

interface Props {
  header: string[];
  headerLabel: string[];
  data: BaseEntity[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TableList = ({
                            header,
                            headerLabel,
                            data,
                            isLoading,
                            onEdit,
                            onDelete,
                          }: Props) => {
  const texts = useAppSelector((root: RootState) => root.common.texts);

  const tableBody = data.map((row, index) => (
    <StyledTableRow key={index}>
      {header.map((key, valueIndex) => (
        <StyledTableCell key={valueIndex} align="center">
          {row[key as keyof typeof row] as React.ReactNode}
        </StyledTableCell>
      ))}
      <PrivateElement permission={Permission.SUBJECT_UPDATE}>
        <StyledTableCell align="center">
          <Button
            variant="outlined"
            color="success"
            onClick={() => onEdit(row.id as number)}>
            {texts.layout.form.edit}
          </Button>
        </StyledTableCell>
      </PrivateElement>
      <PrivateElement permission={Permission.SUBJECT_DELETE}>
        <StyledTableCell align="center">
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(row.id as number)}>
            {texts.layout.form.delete}
          </Button>
        </StyledTableCell>
      </PrivateElement>
    </StyledTableRow>
  ));
  const skeletonBody = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
    <StyledTableRow key={index}>
      {header.map((_, valueIndex) => (
        <StyledTableCell key={valueIndex} align="center">
          <Skeleton animation="pulse"/>
        </StyledTableCell>
      ))}
      <StyledTableCell align="center">
        <Skeleton animation="pulse"/>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Skeleton animation="pulse"/>
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headerLabel.map((value, index) => (
              <StyledTableCell key={index} align="center">
                {value}
              </StyledTableCell>
            ))}
            <PrivateElement permission={Permission.SUBJECT_UPDATE}>
              <StyledTableCell align="center">#</StyledTableCell>
            </PrivateElement>
            <PrivateElement permission={Permission.SUBJECT_DELETE}>
              <StyledTableCell align="center">#</StyledTableCell>
            </PrivateElement>
          </TableRow>
        </TableHead>
        <TableBody>{isLoading ? skeletonBody : tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
};


const StyledTableRow = styled(TableRow)(({theme}) => ({
  whiteSpace: "nowrap",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide the last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
