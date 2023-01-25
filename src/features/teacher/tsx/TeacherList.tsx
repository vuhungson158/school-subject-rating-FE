import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Pagination, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TeacherRequestI } from "../../../language";
import { keyofTeacherEntity, Permission } from "../../../model";
import { PrivateElement } from "../../auth";
import { CustomedLink, TableList } from "../../common";
import { selectTeacherListAfterFilter, teacherActions, TeacherFilter } from "../";

export const TeacherList = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const teacherList = useAppSelector((root: RootState) => root.teacher.teacherList);
  const { limit, page } = useAppSelector((root: RootState) => root.teacher.filter);
  const isLoading = useAppSelector((root: RootState) => root.teacher.isLoading);
  const data = useAppSelector(selectTeacherListAfterFilter).map((teacher) => ({
    ...teacher,
    name: <CustomedLink to={`${teacher.id}`}>{teacher.name}</CustomedLink>,
  }));
  return (
    <Box>
      <PrivateElement permission={Permission.TEACHER_CREATE}>
        <AddButton
          title="New Teacher"
          onClick={() => dispatch(teacherActions.setBackdropOpen(true))}
        />
      </PrivateElement>
      <TeacherFilter />
      <TableList
        header={keyofTeacherEntity}
        headerLabel={keyofTeacherEntity.map(
          (key) => texts.model.teacher.request[key as keyof TeacherRequestI],
        )}
        data={data}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <Box mt={2} mb={1} display="flex" justifyContent="center" alignItems="center">
        <Pagination
          size="large"
          count={Math.ceil(data.length / limit)}
          page={page + 1}
          color="secondary"
          onChange={(event: React.ChangeEvent<any>, page: number) => {
            dispatch(teacherActions.setPage(page - 1));
          }}
        />
        <Box>
          Limit: {data.length} / Total: {teacherList.length}
        </Box>
      </Box>
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
