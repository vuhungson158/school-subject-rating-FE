import { Autocomplete, Box, Button, DialogActions, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useEffect, useRef } from "react";
import Graph, { Edge, graphEvents, Node, Options } from "react-graph-vis";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import thunk from "./thunk";

const Condition = () => {
  const dispatch = useAppDispatch();
  const subjectList = useAppSelector((root: RootState) => root.subject.list);
  const graphData = useAppSelector(
    (root: RootState) => root.subjectCondition.graphData,
  );
  const first = useRef(true);

  const nodes: Node[] = subjectList
    .filter((subject) => graphData.subjectIds.includes(subject.id))
    .map((subject) => ({
      id: subject.id,
      label: subject.name,
    }));
  const edges: Edge[] = graphData.subjectConditionList.map((condition) => ({
    from: condition.fromId,
    to: condition.toId,
  }));

  console.log({ nodes, edges });

  useEffect(() => {
    if (first.current) {
      dispatch(thunk.fetchGraphData());
      first.current = false;
    }
  }, [dispatch, graphData]);

  const options: Options = {
    layout: {
      hierarchical: {
        enabled: true,
        nodeSpacing: 10,
        direction: "LR",
      },
    },
    edges: {
      color: "white",
      length: 1,
    },
    nodes: {
      shape: "box",
    },
    height: document.documentElement.clientHeight * 0.85 + "px",
    width: "100%",
    autoResize: true,
  };

  const events: graphEvents = {
    select: function (event: any) {
      // var { nodes, edges } = event;
    },
  };

  return (
    <Box>
      <DialogSlide />

      <Graph
        graph={{
          nodes,
          edges,
        }}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent tableComponents using this property
        }}
      />
    </Box>
  );
};

const DialogSlide = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [fromId, setFromId] = React.useState<number>(0);
  const toId = React.useRef<number>(0);
  const subjectList = useAppSelector((root: RootState) => root.subject.list);
  const graphData = useAppSelector(
    (root: RootState) => root.subjectCondition.graphData,
  );
  const disabledIds: number[] = [fromId];
  for (const condition of graphData.subjectConditionList) {
    if (condition.fromId === fromId || condition.toId === fromId) {
      if (!disabledIds.includes(condition.fromId)) {
        disabledIds.push(condition.fromId);
      }
      if (!disabledIds.includes(condition.toId)) {
        disabledIds.push(condition.toId);
      }
    }
  }
  console.log(disabledIds);

  return (
    <Box>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => {
          setOpen(true);
        }}>
        科目履修登録条件を追加
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpen(false);
        }}>
        <DialogTitle textAlign="center">科目履修登録条件を追加</DialogTitle>
        <DialogContent>
          
          <Box marginTop={4}>
            <Autocomplete
              sx={{ width: 300 }}
              options={subjectList.map((subject) => ({
                id: subject.id,
                label: subject.name,
              }))}
              getOptionLabel={(option) => option.label}
              getOptionDisabled={(option) => disabledIds.includes(option.id)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, value) => {
                if (value) {
                  toId.current = value?.id;
                }
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="科目" />
              )}
            />
          </Box>
          <Box marginTop={4}>
            <Autocomplete
              sx={{ width: 300 }}
              options={subjectList.map((subject) => ({
                id: subject.id,
                label: subject.name,
              }))}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, value) => {
                if (value) {
                  setFromId(value.id);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="条件" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              dispatch(thunk.add({ fromId, toId: toId.current }));
            }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default Condition;
