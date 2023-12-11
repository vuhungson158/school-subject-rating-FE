import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {RootState} from "../../../../app/store";
import {subjectActions} from "../subjectSlice";
import {Box, Pagination} from "@mui/material";
import React from "react";
import {Pagination as PaginationType} from "../../../../common/model";

export const Paginator = () => {
    const dispatch = useAppDispatch();
    const {
        limit,
        page
    }: PaginationType = useAppSelector((root: RootState) => root.subject.pagination);
    const listSize: number = useAppSelector((root: RootState) => root.subject.list.length);


    return (
        <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
            <Pagination
                size="large"
                count={Math.ceil(listSize / limit)}
                page={page + 1}
                color="secondary"
                onChange={(event: React.ChangeEvent<any>, page: number) => {
                    dispatch(subjectActions.setPagination({
                        limit,
                        page: page - 1
                    }));
                }}
            />
            <Box>

                Limit: {limit} / Total: {listSize}
            </Box>
        </Box>
    );
};