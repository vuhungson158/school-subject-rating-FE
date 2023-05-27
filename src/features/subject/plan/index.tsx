import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { group } from "console";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { Department } from "../../common/model";
import thunk from "./thunk";

const Plan = () => {
  const dispatch = useAppDispatch();
  const groupList = useAppSelector((root: RootState) => root.subjectPlan.group);
  const [department, setDepartment] = useState<Department>("NETWORK");
  const group = groupList.find((group) => group.name === department);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      dispatch(thunk.fetchAllByGroup());
      first.current = false;
    }
  }, [dispatch]);

  return (
    <Box>
      <ButtonGroup fullWidth variant="outlined">
        {groupList.map((item) => (
          <Button
            key={item.name}
            variant={department === item.name ? "contained" : "outlined"}
            onClick={() => setDepartment(item.name)}>
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
      <Box border={2} marginTop={2}>
        <TableContainer component={Paper}>
          <Table sx={{ ".MuiTableCell-root": { border: 1 } }}>
            <Header />
            <TableBody>
              {group &&
                group.bigList.map((big) =>
                  big.middleList.map((middle, middleIndex) =>
                    middle.smallList.map((small, smallIndex) => (
                      <TableRow key={small.name}>
                        {smallIndex === 0 && middleIndex === 0 && (
                          <VerticalCell rowSpan={big.rowspan}>{big.label}</VerticalCell>
                        )}
                        {smallIndex === 0 && <VerticalCell rowSpan={middle.rowspan}>{middle.label}</VerticalCell>}
                        <YearCell smallGroupLabel={small.label} />
                      </TableRow>
                    )),
                  ),
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const YearCell = ({ smallGroupLabel }: { smallGroupLabel: string }) => (
  <>
    <VerticalCell>{smallGroupLabel}</VerticalCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
  </>
);

const VerticalCell = (props: TableCellProps) => (
  <TableCell
    {...props}
    sx={{
      writingMode: "vertical-rl",
      textOrientation: "upright",
      textAlign: "center",
      width: "12px",
    }}>
    {props.children}
  </TableCell>
);

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={3}></TableCell>
        <TableCell align="center">１年生</TableCell>
        <TableCell align="center">２年生</TableCell>
        <TableCell align="center">３年生</TableCell>
        <TableCell align="center">４年生</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default Plan;
