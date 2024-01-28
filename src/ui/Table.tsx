import {
    Paper,
    Skeleton,
    styled,
    Table,
    TableBody as MuiTableBody,
    TableCell,
    tableCellClasses,
    TableContainer as MuiTableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import * as React from "react";
import {ReactNode} from "react";
import {AnyObject} from "../common/WrapperType";
import {TABLE_MIN_WIDTH} from "../common/constant";

export const TableContainer = ({children}: { children: ReactNode }) => {
    return (
        <MuiTableContainer component={Paper}>
            <Table sx={{minWidth: TABLE_MIN_WIDTH}}>
                {children}
            </Table>
        </MuiTableContainer>
    )
}

export const TableHeader = ({headers}: { headers: string[] }) => {
    return (
        <TableHead>
            <StyledTableRow>
                {headers.map((value: string, index: number) => (
                    <StyledTableCell key={index}>
                        {value}
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    )
}

export const TableSkeleton = ({headers}: { headers: string[] }) => {
    const rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <MuiTableBody>
            {rows.map((_, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                    {headers.map((_: string, cellIndex: number) => (
                        <StyledTableCell key={cellIndex}>
                            <Skeleton animation="pulse"/>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </MuiTableBody>
    )
}

export const TableBody = <T extends AnyObject>({header, data}: { header: Array<keyof T>; data: T[] }) => {
    return (
        <MuiTableBody>
            {data.map((row: T, rowIndex: number) => (
                <StyledTableRow key={rowIndex}>
                    {header.map((cell: keyof T, cellIndex: number) => (
                        <StyledTableCell key={cellIndex}>
                            {row[cell]}
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </MuiTableBody>
    )
}

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    textAlign: "center",
}));

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