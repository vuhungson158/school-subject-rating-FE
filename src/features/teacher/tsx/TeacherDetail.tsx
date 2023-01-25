import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { CustomedLink, TabBox } from "../../common";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TeacherRating } from "./TeacherRating";

export const TeacherDetail = () => {
  return (
    <TabBox
      tabList={[
        { tabLabel: "Profile", tabContent: <TeacherProfile /> },
        { tabLabel: "Rating", tabContent: <TeacherRating /> },
        { tabLabel: "Comment", tabContent: <></> },
      ]}
    />
  );
};

const TeacherProfile = () => {
  const { id } = useParams();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const teacher = useAppSelector((root: RootState) =>
    root.teacher.teacherList.find((teacher) => teacher.id === Number(id)),
  );
  const subjectList = useAppSelector((root: RootState) =>
    root.subject.subjectList.filter((subject) => subject.teacherId === Number(id)),
  );

  const data = teacher
    ? [
        {
          label: texts.model.teacher.request.name,
          value: teacher?.name,
        },
        {
          label: "担当する科目",
          value: (
            <Box>
              {subjectList.map((subject) => (
                <CustomedLink
                  key={subject.id}
                  sx={{ fontSize: 24, marginRight: 8, whiteSpace: "nowrap" }}
                  to={`/subject/${subject.id}`}>
                  {subject.name}
                </CustomedLink>
              ))}
            </Box>
          ),
        },
        {
          label: texts.model.teacher.request.dob,
          value: teacher.dob,
        },
        {
          label: texts.model.teacher.request.nationality,
          value: teacher?.nationality,
        },
        {
          label: texts.model.teacher.request.gender,
          value: texts.enum.gender[teacher?.gender],
        },
      ]
    : [];

  return (
    <Box>
      {teacher && (
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
