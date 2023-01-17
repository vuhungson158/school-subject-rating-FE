import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
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
  // const texts = useAppSelector((root: RootState) => root.common.texts);
  const subject = useAppSelector((root: RootState) =>
    root.subject.subjectList.find((subject) => subject.id === Number(id)),
  );
  const teacherObj = useAppSelector(selectTeacherObject);

  const data = subject
    ? [
        {
          label: "Name",
          value: subject?.name,
        },
        {
          label: "Teacher",
          value: (
            <CustomedLink sx={{ fontSize: 32 }} to={`/teacher/${subject.teacherId}`}>
              {teacherObj[subject.teacherId as keyof typeof teacherObj]}
            </CustomedLink>
          ),
        },
        {
          label: "Specialize",
          value: subject?.specialize,
        },
        {
          label: "Unit",
          value: subject?.unit,
        },
        {
          label: "参加できる学年",
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
