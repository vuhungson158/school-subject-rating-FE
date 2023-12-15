import {Paper, Table as MuiTable, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "./index";

export const TableFrame = ({header, body}: { header: string[], body: any[][] }) => (
    <TableContainer component={Paper}>
        <MuiTable sx={{minWidth: 700}} aria-label="customized table">
            <TableHead>
                <TableRow>
                    {header.map((column, index) => (
                        <StyledTableCell key={index} align="center" sx={{fontWeight: "bold"}}>
                            {column}
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {body.map((row, rowIndex) => (
                    <StyledTableRow key={rowIndex}>
                        {row.map((column, columnIndex) => (
                            <StyledTableCell key={columnIndex} align="center">
                                {column}
                            </StyledTableCell>
                        ))}
                    </StyledTableRow>
                ))}
            </TableBody>
        </MuiTable>
    </TableContainer>
)