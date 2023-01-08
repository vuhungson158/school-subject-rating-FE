import { Box, Paper } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ColumnGraphProps {
  title: string;
  data: {
    labels: string[];
    averages: number[];
    yours: number[];
  };
}

export const ColumnGraph = ({ title, data }: ColumnGraphProps) => {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);
  const color = darkTheme ? "#fff" : "#111";

  return (
    <Paper elevation={1}>
      <Box marginX={4} marginY={2}>
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom" as const,
                labels: {
                  boxWidth: 48,
                  padding: 48,
                  font: {
                    size: 18,
                  },
                  color,
                },
              },
              title: {
                display: true,
                text: title,
                color,
                font: {
                  size: 36,
                },
              },
            },
            scales: {
              y: {
                max: 100,
                ticks: {
                  color,
                },
              },
              x: {
                ticks: {
                  color,
                  font: {
                    size: 16,
                  },
                },
              },
            },
          }}
          data={{
            labels: data.labels,
            datasets: [
              {
                label: "Average",
                data: data.averages,
                backgroundColor: "#6200ea",
              },
              {
                label: "Your Rating",
                data: data.yours,
                backgroundColor: "#bdbdbd",
              },
            ],
          }}
        />
      </Box>
    </Paper>
  );
};
