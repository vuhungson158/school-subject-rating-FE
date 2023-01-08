import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { createGraphData, fakeSubjectDetail, SubjectEntity } from "../../model";
import { ColumnGraph } from "../common/ColumnGraph";

export const SubjectDetail = () => {
  const { id } = useParams();
  const subjectList = useAppSelector((root: RootState) => root.subject.subjectList);
  const data = fakeSubjectDetail(
    subjectList.find((subject) => subject.id === Number(id)) as SubjectEntity,
  );

  return (
    <Box>
      <ColumnGraph title={`${data.name}`} data={createGraphData(data)} />
      <Paper variant="outlined">
        <Typography variant="h2" textAlign={"center"} marginBottom={6} marginTop={4}>
          Profile
        </Typography>
        <Text name="Name" value={data.name} />
        <Text name="Specialize" value={data.specialize} />
        <Text name="Unit" value={data.unit} />
        <Text name="Year Enable" value={data.formYear} />
        <Text name="Teacher" value={data.teacherId} />
      </Paper>
    </Box>
  );
};

const Text = ({ name, value }: { name: string; value: any }) => (
  <Typography
    display={"flex"}
    justifyContent={"space-between"}
    marginRight={24}
    marginBottom={2}
    marginX={12}
    paddingX={2}
    sx={{ borderBottom: "1px solid" }}>
    <Typography variant="h5">{name}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Typography>
);
