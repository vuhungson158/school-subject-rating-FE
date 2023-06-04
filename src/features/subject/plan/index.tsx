import { CheckCircle, Error } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  ButtonGroup as MuiButtonGroup,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { GRADUATION_CREDIT_NEEDED, classificationColor } from "../../../constant";
import { Status } from "../../common/model";
import { Entity } from "../base/model";
import { SubjectByYear } from "./model";
import { actions } from "./slice";

const Plan = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <Box overflow="hidden">
      <ButtonGroup />
      <ThemeProvider theme={theme}>
        <Box marginTop={2} borderRadius={4}>
          <TableContainer component={Paper}>
            <Table sx={{ ".MuiTableCell-root": { border: 1 } }}>
              <Header />
              <Body />
            </Table>
          </TableContainer>
        </Box>
      </ThemeProvider>
      <StateListenner />
    </Box>
  );
};

const ButtonGroup = () => {
  const dispatch = useAppDispatch();
  const departmentList = useAppSelector((root: RootState) => root.subjectPlan.groupList);
  const department = useAppSelector((root: RootState) => root.subjectPlan.selectedDepartment);

  return (
    <MuiButtonGroup fullWidth variant="outlined">
      {departmentList.map((item) => (
        <Button
          key={item.name}
          variant={department === item.name ? "contained" : "outlined"}
          onClick={() => dispatch(actions.setDepartment(item.name))}>
          {item.label}
        </Button>
      ))}
    </MuiButtonGroup>
  );
};

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={3}></TableCell>
        <TableCell align="center">１年生</TableCell>
        <TableCell align="center">２年生</TableCell>
        <TableCell align="center">３・４年生</TableCell>
      </TableRow>
    </TableHead>
  );
};

const Body = () => {
  const group = useAppSelector((root: RootState) => {
    const { groupList, selectedDepartment } = root.subjectPlan;
    return groupList.find((group) => group.name === selectedDepartment);
  });
  const status = useAppSelector((root: RootState) => root.subjectPlan.status);

  return (
    <TableBody>
      {group &&
        group.bigList.map((big) =>
          big.middleList.map((middle, middleIndex) =>
            middle.smallList.map((small, smallIndex) => (
              <TableRow key={small.name}>
                {smallIndex === 0 && middleIndex === 0 && (
                  <VerticalCell
                    status={status.big[big.name] >= big.creditNeeded ? "SUCCESS" : "ERROR"}
                    rowSpan={big.rowspan}>
                    {big.label}
                  </VerticalCell>
                )}
                {smallIndex === 0 && (
                  <VerticalCell
                    status={status.middle[middle.name] >= middle.creditNeeded ? "SUCCESS" : "ERROR"}
                    rowSpan={middle.rowspan}>
                    {middle.label}
                  </VerticalCell>
                )}
                <YearCells
                  yearList={small.yearList}
                  smallLabel={small.label}
                  color={classificationColor[middle.name]}
                />
              </TableRow>
            )),
          ),
        )}
      <TableRow>
        <TableCell colSpan={6}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">卒業条件満たす：</Typography>
            <Box marginBottom={-2}>
              <StatusIcon status={status.all >= GRADUATION_CREDIT_NEEDED ? "SUCCESS" : "ERROR"} />
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const StateListenner = () => {
  const dispatch = useAppDispatch();
  const checkedList = useAppSelector((root: RootState) => root.subjectPlan.checkedList);

  useEffect(() => {
    dispatch(actions.calculate());
  }, [checkedList, dispatch]);

  return <></>;
};

const YearCells = ({ yearList, smallLabel, color }: { yearList: SubjectByYear; smallLabel: string; color: string }) => (
  <>
    <VerticalCell sx={{ backgroundColor: color }}>{smallLabel}</VerticalCell>
    {yearList.map((year, index) => (
      <TableCell key={index} sx={{ backgroundColor: color }}>
        {year.map(({ subjectEntity: subject }) => {
          return <Subject key={subject.id}>{subject}</Subject>;
        })}
      </TableCell>
    ))}
  </>
);

const Subject = ({ children }: { children: Entity }) => {
  const dispatch = useAppDispatch();
  const checkedList = useAppSelector((root: RootState) => root.subjectPlan.checkedList);
  const disabledList = useAppSelector((root: RootState) => root.subjectPlan.disabledList);

  const { id } = children;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: 12 }}>
      <Box display="flex" alignItems="center">
        <Checkbox
          onChange={() => dispatch(actions.tonggleId(id))}
          checked={checkedList.includes(id)}
          disabled={disabledList.includes(id)}
          sx={{ padding: 0 }}
        />
        <Box component="div" marginLeft={2}>
          {children.name}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" marginLeft={2}>
        <Box>（後期）</Box>
        <Box>（{children.unit}単位）</Box>
      </Box>
    </Box>
  );
};

const VerticalCell = ({ status, ...props }: { status?: Status } & TableCellProps) => {
  return (
    <TableCell
      {...props}
      sx={{
        writingMode: "vertical-rl",
        textOrientation: "upright",
        textAlign: "center",
        width: "12px",
        ...props.sx,
      }}>
      <StatusIcon status={status} />
      {props.children}
    </TableCell>
  );
};

const StatusIcon = ({ status }: { status?: Status }) => {
  const style: SxProps = { marginBottom: 2, width: 40, height: 40 };

  return (
    <>
      {status === "ERROR" && (
        <Error
          sx={{
            color: (theme: Theme) => theme.palette.error.dark,
            ...style,
          }}
        />
      )}
      {status === "SUCCESS" && (
        <CheckCircle
          sx={{
            color: (theme: Theme) => theme.palette.primary.dark,
            ...style,
          }}
        />
      )}
    </>
  );
};

export default Plan;
