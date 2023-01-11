import { Box } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ColumnGraphProps {
  title: string;
  data: {
    label: string[];
    columns: {
      label: string;
      backgroundColor: string;
      values: number[];
    }[];
  };
}

export const ColumnGraph = ({ title, data }: ColumnGraphProps) => {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);
  const color = darkTheme ? "#fff" : "#111";
  const gridColor = darkTheme ? "#666" : "#555";

  return (
    <Box marginX={4} marginY={2} textAlign="center">
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
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
              grid: {
                color: gridColor,
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
          labels: data.label,
          datasets: data.columns.map((column) => ({
            label: column.label,
            data: column.values,
            backgroundColor: column.backgroundColor,
          })),
        }}
      />
    </Box>
  );
};
