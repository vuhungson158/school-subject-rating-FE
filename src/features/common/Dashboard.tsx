import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Skeleton, Toolbar,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Accordion, commonThunk, CustomedLink } from "./";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const statistics = useAppSelector((root: RootState) => root.common.statistics);

  useEffect(() => {
    dispatch(commonThunk.fetchStatistics());
  }, [dispatch]);

  return (
    <Box>
      <NavBar />
      <Accordion icon={<DashboardIcon />} label={texts.common.statistics}>
        <Grid container spacing={2} marginY={2}>
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
    <Box
      sx={{ border: "1px solid #333", borderRadius: 4 }}
      paddingTop={2}
      paddingBottom={1}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft={2}
        paddingRight={4}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5">{data || 0}</Typography>
      </Box>
      <Typography variant="subtitle2" paddingX={4} color="GrayText">
        {subTitle || title}
      </Typography>
    </Box>
  );
};

const NavBar = () => {
  const texts = useAppSelector((root: RootState) => root.common.texts);

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InsertChartIcon />
          <Typography variant="h6">機能</Typography>

          <Box marginLeft={2} display="flex">
            <CustomedLink to="/subject">
              <Typography variant="h6" marginX={2}>
                {texts.layout.navigation.subject}
              </Typography>
            </CustomedLink>
            <CustomedLink to="/teacher">
              <Typography variant="h6" marginX={2}>
                {texts.layout.navigation.teacher}
              </Typography>
            </CustomedLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
