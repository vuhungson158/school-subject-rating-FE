import {Box, Pagination as Paginator} from "@mui/material";
import React from "react";
import {SoloInputLimitSelect} from "../ui/SoloInput";
import {Limit} from "../model/templateLiteral";

export const ListPagePaginator = ({listSize, limit, page, onPageChange, onLimitChange}: {
    listSize: number;
    limit: Limit;
    page: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: Limit) => void;
}) => {
    return (
        <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
            <Paginator
                size="large"
                count={Math.ceil(listSize / limit)}
                page={page + 1}
                color="secondary"
                onChange={(_: React.ChangeEvent<any>, page: number): void => onPageChange(page)}
            />
            <Box display="flex" alignItems="center">
                {<SoloInputLimitSelect
                    label="Limit"
                    value={limit}
                    onChange={(limit: Limit): void => onLimitChange(limit)}
                />}
                <Box marginLeft={2}> / Total: {listSize}</Box>
            </Box>
        </Box>
    )
}