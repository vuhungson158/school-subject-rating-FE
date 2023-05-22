import { Box } from "@mui/material";
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
  const fetched = useRef(false);

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

  useEffect(() => {
    if (!fetched.current) {
      dispatch(thunk.fetchGraphData());
      fetched.current = true;
    }
  }, [dispatch, graphData]);

  const options: Options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "white",
    },
    nodes: {
      shape: "box",
    },
    height: "700px",
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
      <Graph
        graph={{
          nodes,
          edges,
        }}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </Box>
  );
};

export default Condition;
