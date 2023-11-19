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

export const TableHeader = ({headers}: { headers: string[] }) => {
    return (
        <TableHead>
            <StyledTableRow>
                {headers.map((value, index) => (
                    <StyledTableCell key={index} align="center">
                        {value}
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    )
}

export const TableSkeleton = ({headers}: { headers: string[] }) => {
    const numberOfRow = 10;
    const skeletons: JSX.Element[] = [];

    for (let i = 0; i < numberOfRow; i++) {
        skeletons.push(
            <StyledTableRow key={i}>
                {headers.map((_, cellIndex) => (
                    <StyledTableCell key={cellIndex} align="center">
                        <Skeleton animation="pulse"/>
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        )
    }

    return (
        <TableBodyMui>
            {skeletons.map((skeleton: JSX.Element) => (
                <>{skeleton}</>
            ))}
        </TableBodyMui>
    )
}

export const TableBody = ({data}: { data: Array<{ [key: string]: string | number | JSX.Element }>; }) => {
    return (
        <TableBodyMui>
            {data.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
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