import { CheckCircle, Error } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
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
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { GRADUATION_CREDIT_NEEDED, classificationColor } from "../../../constant";
import { Status, departmentListExceptAll } from "../../common/model";
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
  const selectedDepartment = useAppSelector((root: RootState) => root.subjectPlan.selectedDepartment);

  return (
    <MuiButtonGroup fullWidth variant="outlined">
      {departmentListExceptAll.map((department) => (
        <Button
          key={department}
          variant={selectedDepartment === department ? "contained" : "outlined"}
          onClick={() => dispatch(actions.setDepartment(department))}>
          {department}
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
  const bigList = useAppSelector((root: RootState) => root.subjectPlan.bigList.list);
  const status = useAppSelector((root: RootState) => root.subjectPlan.status);
  const selectedDepartment = useAppSelector((root: RootState) => root.subjectPlan.selectedDepartment);

  const requiredCredits = bigList.reduce((total, current) => total + current.requiredCredits, 0);
  return (
    <TableBody>
      {bigList.map((big) =>
        big.middleList.map((middle, middleIndex) =>
          middle.smallList
            .filter((small) => small.department === selectedDepartment || small.department === "ALL")
            .map((small, smallIndex) => {
              const checkedBigCredit = status.big[big.name];
              const neededBigCredit = big.creditNeeded;
              const requiredBigCredits = big.requiredCredits;

              const checkedMiddleCredit = status.middle[middle.name];
              const neededMiddleCredit = middle.creditNeeded;
              const requiredMiddleCredits = middle.requiredCredits;

              return (
                <TableRow key={small.name}>
                  {smallIndex === 0 && middleIndex === 0 && (
                    <VerticalCell
                      status={checkedBigCredit >= neededBigCredit}
                      tooltipTitle={
                        <Box>
                          <Box>{checkedBigCredit + " / " + neededBigCredit}（選択）</Box>
                          <Box>{requiredBigCredits + " / " + requiredBigCredits}（必須）</Box>
                        </Box>
                      }
                      rowSpan={big.rowspan[selectedDepartment]}>
                      {big.label}
                    </VerticalCell>
                  )}
                  {smallIndex === 0 && (
                    <VerticalCell
                      status={checkedMiddleCredit >= neededMiddleCredit}
                      tooltipTitle={
                        <Box>
                          <Box>{checkedMiddleCredit + " / " + neededMiddleCredit}（選択）</Box>
                          <Box>{requiredMiddleCredits + " / " + requiredMiddleCredits}（必須）</Box>
                        </Box>
                      }
                      rowSpan={middle.rowspan[selectedDepartment]}>
                      {middle.label}
                    </VerticalCell>
                  )}
                  <YearCells
                    yearList={small.yearList}
                    smallLabel={small.label}
                    color={classificationColor[middle.name]}
                  />
                </TableRow>
              );
            }),
        ),
      )}
      <TableRow>
        <TableCell colSpan={6}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">卒業条件満たす：</Typography>
            <Box marginBottom={-2}>
              <StatusIcon
                tooltipTitle={
                  <Box>
                    <Box>{status.all + " / " + GRADUATION_CREDIT_NEEDED}（選択）</Box>
                    <Box>{requiredCredits + " / " + requiredCredits}（必須）</Box>
                  </Box>
                }
                status={status.all >= GRADUATION_CREDIT_NEEDED ? "PRIMARY" : "ERROR"}
              />
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

const VerticalCell = ({
  status,
  tooltipTitle,
  ...props
}: { status?: boolean; tooltipTitle?: ReactElement } & TableCellProps) => {
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
      {status !== undefined && <StatusIcon status={status ? "PRIMARY" : "ERROR"} tooltipTitle={tooltipTitle} />}

      {props.children}
    </TableCell>
  );
};

const StatusIcon = ({
  status,
  tooltipTitle,
  size,
}: {
  status?: Status;
  tooltipTitle?: ReactElement;
  size?: number;
}) => {
  const style: SxProps = { marginBottom: 2, width: size || 40, height: size || 40 };

  return (
    <>
      {status !== undefined && (
        <Tooltip title={<>{tooltipTitle}</>} placement="top">
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}>
            {status === "ERROR" && (
              <Error
                sx={{
                  color: (theme: Theme) => theme.palette.error.dark,
                  ...style,
                }}
              />
            )}
            {status === "PRIMARY" && (
              <CheckCircle
                sx={{
                  color: (theme: Theme) => theme.palette.primary.dark,
                  ...style,
                }}
              />
            )}
            {status === "SUCCESS" && (
              <CheckCircle
                sx={{
                  color: (theme: Theme) => theme.palette.success.dark,
                  ...style,
                }}
              />
            )}
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default Plan;
