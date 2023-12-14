import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {AppBar, Box, Container, Divider, Grid, Skeleton, Toolbar, Typography} from "@mui/material";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {type AppDispatch, RootState} from "../../app/store";
import {Accordion, CustomedLink} from "../../common";
import thunk from "../../common/thunk";

const DashboardRoutes = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const texts = useAppSelector((root: RootState) => root.common.texts);
    const statistics = useAppSelector((root: RootState) => root.common.statistics);

    useEffect(() => {
        !statistics && dispatch(thunk.fetchStatistics());
    }, [dispatch, statistics]);

    return (
        <Box>
            <NavBar/>
            <Accordion icon={<DashboardIcon/>} label={texts.common.statistics}>
                <>
                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total User"
                                subTitle="All user of this app"
                                data={statistics?.totalUser}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget title="Total Admin" data={statistics?.totalAdmin}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget title="Total Manager" data={statistics?.totalManager}/>
                        </Grid>
                    </Grid>

                    <Divider/>

                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Subject"
                                subTitle="All Subject"
                                data={statistics?.totalSubject}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Subject Rating"
                                subTitle="Total Rating of Subject"
                                data={statistics?.totalSubjectRating}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Subject Comment"
                                subTitle="Total Comment of Subject"
                                data={statistics?.totalSubjectComment}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Subject Comment React"
                                subTitle="Total React of Comment of Subject"
                                data={statistics?.totalSubjectCommentReact}
                            />
                        </Grid>
                    </Grid>

                    <Divider/>

                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Teacher"
                                subTitle="All Teacher"
                                data={statistics?.totalTeacher}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Teacher Rating"
                                subTitle="Total Rating of Teacher"
                                data={statistics?.totalTeacherRating}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Teacher Comment"
                                subTitle="Total Comment of Teacher"
                                data={statistics?.totalTeacherComment}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Widget
                                title="Total Teacher Comment React"
                                subTitle="Total React of Comment of Teacher"
                                data={statistics?.totalTeacherCommentReact}
                            />
                        </Grid>
                    </Grid>
                </>
            </Accordion>
            <Accordion
                icon={<CastForEducationIcon/>}
                label={texts.layout.navigation.subject}>
                <></>
            </Accordion>
            <Accordion icon={<PsychologyIcon/>} label={texts.layout.navigation.teacher}>
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
        <Skeleton variant="rounded" width={210} height={60}/>
    ) : (
        <Box
            sx={{border: "1px solid #333", borderRadius: 4}}
            paddingTop={2}
            paddingBottom={1}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                paddingLeft={2}
                paddingRight={4}>
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle2" paddingX={4} color="GrayText">
                        {subTitle || title}
                    </Typography>
                </Box>
                <Typography variant="h5">{data || 0}</Typography>
            </Box>
        </Box>
    );
};

const NavBar = () => {
    const texts = useAppSelector((root: RootState) => root.common.texts);

    const navList = [
        {
            to: "subject",
            label: texts.layout.navigation.subject,
        },
        {
            to: "teacher",
            label: texts.layout.navigation.teacher,
        },
        {
            to: "subject/condition",
            label: "Condition",
        },
        {
            to: "subject/plan",
            label: "Plan",
        },
    ];

    return (
        <AppBar position="static" sx={{marginBottom: 4}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <InsertChartIcon/>
                    <Typography variant="h6">機能</Typography>

                    <Box marginLeft={2} display="flex">
                        {navList.map((link) => (
                            <CustomedLink key={link.to} to={`/${link.to}`}>
                                <Typography variant="h6" marginX={2}>
                                    {link.label}
                                </Typography>
                            </CustomedLink>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default DashboardRoutes;