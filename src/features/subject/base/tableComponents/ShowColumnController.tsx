import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {TextFields} from "../../../../language";
import {RootState} from "../../../../app/store";
import {SubjectEntity, subjectEntityKeys, subjectRequestKeys} from "../subjectModel";
import {Box, Button} from "@mui/material";
import React from "react";
import {Permission, Role} from "../../../../auth/Role";
import {actions} from "../slice";
import {PopUp} from "../../../../widget/PopUp";

export const ShowColumnController = () => {

    const dispatch = useAppDispatch();
    const role = useAppSelector((root: RootState) => root.auth.user?.role);
    const keyList = role && Role[role].includes(Permission.SUBJECT_UPDATE) ? subjectEntityKeys : subjectRequestKeys;
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const showedColumns = useAppSelector((root: RootState) => root.subject.showedColumns);

    const data = Object.entries(showedColumns)
        .filter(([key]) => keyList.includes(key as keyof SubjectEntity))
        .map(([key]) => key as keyof SubjectEntity);
    const concatTexts = {...texts.model.subject.request, ...texts.model.base};

    return (
        <PopUp name="表示の設定">
            {data.map((key, index) => (
                <Box key={index}>
                    <Button
                        sx={{
                            color: (theme) => showedColumns[key]
                                ? theme.palette.primary.dark
                                : theme.palette.neutral.dark,
                            textOverflow: "hidden",
                            whiteSpace: "nowrap",
                            justifyContent: "flex-start"
                        }}
                        onClick={() => dispatch(actions
                            .setShowedColumns({...showedColumns, [key]: !showedColumns[key]}))}
                    >
                        {concatTexts[key]}
                    </Button>
                </Box>
            ))}
        </PopUp>
    )
};