import { Box } from "@mui/material";
import Graph, { graphData, graphEvents, Options } from "react-graph-vis";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

export default () => {
  const subjectList = useAppSelector((root: RootState) => root.subject.list);

  const graph: graphData = {
    nodes: subjectList.map((subject) => ({
      id: subject.id,
      label: subject.name,
    })),
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 1 },
      { from: 2, to: 1 },
    ],
  };

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
  };

  const events: graphEvents = {
    select: function (event: any) {
      // var { nodes, edges } = event;
    },
  };

  return (
    <Box border={1}>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </Box>
  );
};
