import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../ui";
import React from "react";

type CellValue = string | number | JSX.Element;

type TableRow<H extends string = string> = Record<H, CellValue>

export type TableKey<R extends TableRow> = keyof R;
export type HeaderLabelsMap<K extends TableKey<TableRow>> = Record<K, string>;

const TableTemplate = <H extends string>({
    isFetching, displayColumns, headerLabelsMap, list
}: {
    isFetching: boolean;
    list: TableRow<H>[];
    displayColumns?: ReadonlyArray<H>;
    headerLabelsMap?: Partial<Record<H, string>>;
}) => {
    if (!list.length) return <></>;

    const keys: ReadonlyArray<H> = displayColumns || (Object.keys(list[0]) as H[]);
    const headerLabels: ReadonlyArray<string> = headerLabelsMap
        ? keys.map((key: H) => headerLabelsMap[key] || key) : keys;

    return (
        <TableContainer>
            <TableHeader headers={headerLabels}/>
            {isFetching
                ? <TableSkeleton headers={headerLabels}/>
                : <TableBody header={keys} data={list}/>}
        </TableContainer>
    );
}

export default React.memo(TableTemplate);