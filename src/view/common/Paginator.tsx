import {Box, Pagination} from "@mui/material";
import React, {useState} from "react";
import {SoloInputLimitSelect} from "../../ui";
import {Limit} from "../../model/templateLiteral";
import {UseState} from "../../common/WrapperType";

export interface PageRequest {
    page: number;
    limit: Limit;
}

const pageRequestInitValue: PageRequest = {
    page: 1, // use 1 instead 0, because it simple to understand
    limit: 5,
}

interface PaginatorProps {
    page: number;
    limit: Limit;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: Limit) => void;
}

export interface UsePaginatorProps extends PaginatorProps {
    backFistPage: () => void;
    manualPaging: <T>(list: T[]) => T[];
}

export const usePaginatorProps = (): UsePaginatorProps => {
    const [page, setPage]: UseState<number> = useState(pageRequestInitValue.page);
    const [limit, setLimit]: UseState<Limit> = useState(pageRequestInitValue.limit);

    const backFistPage = () => {
        setPage(pageRequestInitValue.page);
    }

    const handleLimitChange = (limit: Limit) => {
        backFistPage();
        setLimit(limit);
    }

    const manualPaging = <T extends any>(list: T[]) => {
        return list.slice((page - 1) * limit, page * limit);
    }

    return {page, limit, backFistPage, onPageChange: setPage, onLimitChange: handleLimitChange, manualPaging};
}

export const Paginator = ({listSize, limit, page, onPageChange, onLimitChange}: {
    listSize: number;
} & PaginatorProps) => {
    return (
        <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
            <Pagination
                size="large"
                count={Math.ceil(listSize / limit)}
                page={page}
                color="secondary"
                onChange={(_: React.ChangeEvent<any>, page: number): void => onPageChange(page)}
            />
            <Box display="flex" alignItems="center">
                {<SoloInputLimitSelect
                    label="Limit"
                    value={limit}
                    onSelected={(limit: Limit): void => onLimitChange(limit)}
                />}
                <Box marginLeft={2}> / Total: {listSize}</Box>
            </Box>
        </Box>
    )
};