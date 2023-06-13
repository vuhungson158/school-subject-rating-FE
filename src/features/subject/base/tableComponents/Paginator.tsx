import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {RootState} from "../../../../app/store";
import {teacherMapSelector as selectTeacherObject} from "../../../teacher/base/slice";
import {actions, subjectListAfterFilterSelector} from "../slice";
import {CustomedLink} from "../../../../widget/CustomedLink";
import {SpecializeLanguage} from "../../../../language";
import {Box, Checkbox, Pagination} from "@mui/material";
import React from "react";

export const Paginator = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const {
    limit,
    page
  } = useAppSelector((root: RootState) => root.subject.pagination);
  const subjectList = useAppSelector((root: RootState) => root.subject.list);
  const teacherObj = useAppSelector(selectTeacherObject);
  const data = useAppSelector(subjectListAfterFilterSelector).map((subject) => ({
    ...subject,
    name: <CustomedLink to={`${subject.id}`}>{subject.name}</CustomedLink>,
    teacherId: (
      <CustomedLink to={`/teacher/${subject.teacherId}`}>
        {teacherObj[subject.teacherId as keyof typeof teacherObj]}
      </CustomedLink>
    ),
    specialize: texts.enum.department[subject.department as keyof SpecializeLanguage] || subject.department,
    disable: <Checkbox checked={subject.disable as boolean}/>,
  }));

  return (
    <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
      <Pagination
        size="large"
        count={Math.ceil(data.length / limit)}
        page={page + 1}
        color="secondary"
        onChange={(event: React.ChangeEvent<any>, page: number) => {
          dispatch(actions.setPagination({
            limit,
            page: page - 1
          }));
        }}
      />
      <Box>

        Limit: {limit} / Total: {subjectList.length}
      </Box>
    </Box>
  );
};