import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { SubjectComment, SubjectRating } from "../";
import { CustomedLink, TabBox } from "../../common";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { selectTeacherObject } from "../../teacher";

export const SubjectDetail = () => {
  return (
    <TabBox
      tabList={[
        { tabLabel: "Profile", tabContent: <SubjectProfile /> },
        { tabLabel: "Rating", tabContent: <SubjectRating /> },
        { tabLabel: "Comment", tabContent: <SubjectComment /> },
      ]}
    />
  );
};

const SubjectProfile = () => {
  const { id } = useParams();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const subject = useAppSelector((root: RootState) =>
    root.subject.subjectList.find((subject) => subject.id === Number(id)),
  );
  const teacherObj = useAppSelector(selectTeacherObject);

  const data = subject
    ? [
        {
          label: texts.model.subject.request.name,
          value: subject?.name,
        },
        {
          label: texts.model.subject.request.teacherId,
          value: (
            <CustomedLink sx={{ fontSize: 32 }} to={`/teacher/${subject.teacherId}`}>
              {teacherObj[subject.teacherId as keyof typeof teacherObj]}
            </CustomedLink>
          ),
        },
        {
          label: texts.model.subject.request.specialize,
          value: texts.enum.specialize[subject?.specialize],
        },
        {
          label: texts.model.subject.request.unit,
          value: subject?.unit,
        },
        {
          label: texts.model.subject.request.formYear,
          value: subject?.formYear,
        },
      ]
    : [];

  return (
    <Box>
      {subject && (
        <Box flexWrap="wrap" marginY={4}>
          <Typography variant="h1" component="h2" textAlign="center">
            Profile
          </Typography>
          <Table>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell width="20%">
                    <Typography variant="h5" component="h5">
                      {item.label}:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h4"
                      component="h4"
                      marginLeft={2}
                      color="GrayText">
                      {item.value}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
