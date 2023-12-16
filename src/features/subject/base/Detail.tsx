import {Box, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {CustomRouterLink, TabBox} from "../../../common";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import Rating from "../rating";
import Comment from "../comment";
import {teacherMapSelector} from "../../../app/teacherSlice";
import {RouterPopUp} from "../../../commonUI";

const Detail = () => {
  return (
    <RouterPopUp>
      <TabBox
        tabList={[
          {tabLabel: "Profile", tabContent: <Profile/>},
          {tabLabel: "Rating", tabContent: <Rating/>},
          {tabLabel: "Comment", tabContent: <Comment/>},
        ]}
      />
    </RouterPopUp>
  )
};

const Profile = () => {
  const {id} = useParams();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const subject = useAppSelector((root: RootState) => root.subject.list.find((subject) => subject.id === Number(id)));
  const teacherObj = useAppSelector(teacherMapSelector);

  const data = subject
    ? [
      {
        label: texts.model.subject.request.name,
        value: subject?.name,
      },
      {
        label: texts.model.subject.request.teacherId,
        value: (
          <CustomRouterLink sx={{fontSize: 32}} to={`/teacher/${subject.teacherId}`}>
            {teacherObj[subject.teacherId as keyof typeof teacherObj]}
          </CustomRouterLink>
        ),
      },
      {
        label: texts.model.subject.request.department,
        value: texts.enum.department[subject?.department],
      },
      {
        label: texts.model.subject.request.credit,
        value: subject?.credit,
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
                    <Typography variant="h4" component="h4" marginLeft={2} color="GrayText">
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

export default Detail;
