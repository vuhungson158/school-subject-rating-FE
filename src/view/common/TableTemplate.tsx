import {TableBody, TableContainer, TableHeader, TableSkeleton} from "../../ui";
import React from "react";

type CellValue = string | number | JSX.Element;

type TableRow<H extends string = string> = Record<H, CellValue>

export type TableKey<R extends TableRow> = keyof R;
export type HeaderLabelsMap<K extends TableKey<TableRow>> = Record<K, string>;

type TableTemplateProps<H extends string> = {
    isFetching: boolean;
    list: TableRow<H>[];
    displayColumns?: ReadonlyArray<H>;
    headerLabelsMap?: Partial<Record<H, string>>;
};

const TableTemplate = <H extends string>({
    isFetching, displayColumns, headerLabelsMap, list
}: TableTemplateProps<H>) => {
    if (!displayColumns && !list.length) return <></>;

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

const propsEqualWhen = <H extends string>(
    prevProps: Readonly<TableTemplateProps<H>>,
    nextProps: Readonly<TableTemplateProps<H>>
): boolean => {
    return prevProps.isFetching === nextProps.isFetching && prevProps.list === nextProps.list;
}

export default React.memo(TableTemplate, propsEqualWhen);