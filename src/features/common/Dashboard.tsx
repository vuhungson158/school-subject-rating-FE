import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Accordion, commonThunk } from "./";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const statistics = useAppSelector((root: RootState) => root.common.statistics);

  useEffect(() => {
    dispatch(commonThunk.fetchStatistics());
  }, [dispatch]);

  return (
    <Box>
      <Accordion icon={<DashboardIcon />} label={texts.common.statistics}>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Total User" subTitle="" data={statistics?.totalUser} />
          </Grid>
        </Grid>
      </Accordion>
      <Accordion
        icon={<CastForEducationIcon />}
        label={texts.layout.navigation.subject}>
        <></>
      </Accordion>
      <Accordion icon={<PsychologyIcon />} label={texts.layout.navigation.teacher}>
        <></>
      </Accordion>
    </Box>
  );
};

const Widget = ({
  title,
  data,
  subTitle,
}: {
  title: string;
  data?: number;
  subTitle?: string;
}) => {
  const isLoading = useAppSelector((root: RootState) => root.common.isLoading);
  return isLoading ? (
    <Skeleton variant="rounded" width={210} height={60} />
  ) : (
    <Paper elevation={4} sx={{ borderRadius: 4 }}>
      <Box paddingY={1} paddingX={2}>
        <Typography color="GrayText" variant="subtitle2">
          {subTitle}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4">{title}</Typography>
          <Typography variant="h4">{data}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
