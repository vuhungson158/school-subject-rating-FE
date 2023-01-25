import AddIcon from "@mui/icons-material/Add";
import { Box, Checkbox, Fab, Pagination, Tooltip } from "@mui/material";
import React from "react";
import {
  selectSubjectListAfterFilter,
  subjectActions,
  SubjectFilter,
  subjectThunk,
} from "../";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { SpecializeI, SubjectRequestI } from "../../../language";
import { Permission, SubjectEntity, SubjectEntityKeys } from "../../../model";
import { PrivateElement } from "../../auth";
import { CustomedLink, DeleteDialog, TableList } from "../../common";
import { selectTeacherObject } from "../../teacher";

export const SubjectList = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const isLoading = useAppSelector((root: RootState) => root.subject.isLoading);
  const { limit, page } = useAppSelector((root: RootState) => root.subject.filter);
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const deleteId = useAppSelector((root: RootState) => root.subject.deleteId);
  const deleteSubject = useAppSelector(
    (root: RootState) =>
      root.subject.subjectList.find(
        (subject) => subject.id === deleteId,
      ) as SubjectEntity,
  );
  const teacherObj = useAppSelector(selectTeacherObject);
  const data = useAppSelector(selectSubjectListAfterFilter).map((subject) => ({
    ...subject,
    name: <CustomedLink to={`${subject.id}`}>{subject.name}</CustomedLink>,
    teacherId: (
      <CustomedLink to={`/teacher/${subject.teacherId}`}>
        {teacherObj[subject.teacherId as keyof typeof teacherObj]}
      </CustomedLink>
    ),
    specialize:
      texts.enum.specialize[subject.specialize as keyof SpecializeI] ||
      subject.specialize,
    disable: <Checkbox checked={subject.disable as boolean} />,
  }));

  return (
    <Box>
      <PrivateElement permission={Permission.SUBJECT_CREATE}>
        <AddButton
          title="New Subject"
          onClick={() => dispatch(subjectActions.setBackdropOpen(true))}
        />
      </PrivateElement>
      <SubjectFilter />
      <TableList
        header={SubjectEntityKeys}
        headerLabel={SubjectEntityKeys.map(
          (key) => texts.model.subject.request[key as keyof SubjectRequestI],
        )}
        data={data}
        isLoading={isLoading}
        onEdit={(id: number) => dispatch(subjectActions.setEditId(id))}
        onDelete={(id: number) => dispatch(subjectActions.setDeleteId(id))}
      />
      <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
        <Pagination
          size="large"
          count={Math.ceil(data.length / limit)}
          page={page + 1}
          color="secondary"
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            dispatch(subjectActions.setPage(page - 1));
          }}
        />
        <Box>
          Limit: {limit} / Total: {subjectList.length}
        </Box>
      </Box>
      {deleteSubject && (
        <DeleteDialog
          open={!!deleteId}
          label={deleteSubject.name}
          onClose={() => dispatch(subjectActions.setDeleteId(undefined))}
          onSubmit={() => dispatch(subjectThunk.delete(deleteId as number))}
        />
      )}
    </Box>
  );
};

const AddButton = ({ title, onClick }: { title: string; onClick?: () => void }) => (
  <Tooltip title={title} onClick={onClick}>
    <Fab
      sx={{ position: "fixed", top: 48, left: 36, zIndex: 1 }}
      className="fixed"
      color="secondary"
      aria-label="add"
      variant="circular">
      {<AddIcon fontSize="large" />}
    </Fab>
  </Tooltip>
);
