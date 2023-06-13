import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {TextFields} from "../../../../language";
import {RootState} from "../../../../app/store";
import {Entity, requestKeys} from "../model";
import {Box, Button, ButtonGroup as MuiButtonGroup} from "@mui/material";
import {actions} from "../slice";
import React from "react";
import {baseKeys} from "../../../common/model";
import {Permission, Role} from "../../../auth/Role";

export const ShowColumnController = () => {
  const role = useAppSelector((root: RootState) => root.auth.user?.role);

  return (
    <Box>
      {role && Role[role].includes(Permission.SUBJECT_UPDATE) && <ButtonGroup keyList={baseKeys}/>}
      <ButtonGroup keyList={requestKeys}/>
    </Box>
  );
};

const ButtonGroup = ({keyList}: {
  keyList: Array<keyof Entity>
}) => {
  const dispatch = useAppDispatch();
  const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
  const showedColumns: Array<keyof Entity> = useAppSelector((root: RootState) => root.subject.showedColumns);

  const concatTexts = {...texts.model.subject.request, ...texts.model.base}
  return (
    <MuiButtonGroup fullWidth variant="outlined" aria-label="outlined button group">
      {keyList.map((key, index) => (
        <Button
          sx={{
            color: (theme) => showedColumns.includes(key)
              ? theme.palette.primary.dark
              : theme.palette.neutral.dark,
            textOverflow: "hidden",
            whiteSpace: "nowrap",
          }}
          key={index}
          onClick={() => dispatch(actions.toggleShowedColumns(key))}
        >
          {concatTexts[key]}
        </Button>
      ))}
    </MuiButtonGroup>
  )
}