import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../ui";
import React from "react";

type CellValue = string | number | JSX.Element;

export const TableTemplate = <H extends string>({
    isFetching, displayColumn, headerLabelsMap, list
}: {
    isFetching: boolean;
    list: Array<Required<Record<H, CellValue>>>;
    displayColumn?: ReadonlyArray<H>;
    headerLabelsMap?: Partial<Record<H, string>>;
}) => {
    const listKeys: ReadonlyArray<H> = Object.keys(list) as H[];
    const keys: ReadonlyArray<H> = displayColumn || listKeys;
    const headerLabels: ReadonlyArray<string> = headerLabelsMap
        ? keys.map((key: H) => headerLabelsMap[key] || key)
        : keys;

    return (
        <TableContainer>
            <TableHeader headers={headerLabels}/>
            {isFetching
                ? <TableSkeleton headers={headerLabels}/>
                : <TableBody header={keys} data={list}/>}
        </TableContainer>
    );
}