import {
    Paper,
    Skeleton,
    styled,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import * as React from "react";

interface Properties {
    data: Array<{ [key: string]: string | number | JSX.Element }>;
}

export const Table = ({
    data
}: Properties) => {
    const headerLabels: string[] = Object.keys(data[0]);
    const hasData: boolean = !!data.length;

    return (
        <TableContainer component={Paper}>
            {hasData
                ? <>
                    <Header labels={headerLabels}/>
                    <Body data={data}/>
                </>
                : <>
                    <SkeletonHeader/>
                    <SkeletonBody/>
                </>
            }
        </TableContainer>
    )
}

const Header = ({labels}: { labels: string[] }) => {
    return (
        <TableHead>
            <StyledTableRow>
                {labels.map((value, index) => (
                    <StyledTableCell key={index} align="center">
                        {value}
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    )
}

const Body = ({data}: Properties) => {
    return (
        <TableBody>
            {data.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                        <StyledTableCell key={cellIndex} align="center">
                            {cell}
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </TableBody>
    )
}

const SkeletonHeader = () => {
    const tenLoop: null[] = [null, null, null, null, null, null, null, null, null, null];

    return (
        <TableContainer component={Paper}>
            <TableHead>
                <StyledTableRow>
                    {tenLoop.map((_, index) => (
                        <StyledTableCell key={index} align="center">
                            <Skeleton animation="pulse"/>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            </TableHead>
        </TableContainer>
    )
}

const SkeletonBody = () => {
    const tenLoop: null[] = [null, null, null, null, null, null, null, null, null, null];

    return (
        <TableBody>
            {tenLoop.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                    {Object.values(tenLoop).map((cell, cellIndex) => (
                        <StyledTableCell key={cellIndex} align="center">
                            {cell}
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </TableBody>
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