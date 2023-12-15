import {
    Skeleton,
    styled,
    TableBody as TableBodyMui,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow
} from "@mui/material";
import * as React from "react";
import {AnyObject} from "../common/WrapperType";

export const TableHeader = ({headers}: { headers: string[] }) => {
    return (
        <TableHead>
            <StyledTableRow>
                {headers.map((value: string, index: number) => (
                    <StyledTableCell key={index} align="center">
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
        <TableBodyMui>
            {rows.map((_, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                    {headers.map((_: string, cellIndex: number) => (
                        <StyledTableCell key={cellIndex} align="center">
                            <Skeleton animation="pulse"/>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </TableBodyMui>
    )
}

export const TableBody = ({data}: { data: AnyObject[] }) => {
    return (
        <TableBodyMui>
            {data.map((row: AnyObject, rowIndex: number) => (
                <StyledTableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex: number) => (
                        <StyledTableCell key={cellIndex} align="center">
                            {cell}
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </TableBodyMui>
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