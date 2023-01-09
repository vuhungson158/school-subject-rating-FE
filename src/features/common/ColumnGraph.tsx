import { Box } from "@mui/material";
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
import { TextFields } from "../../language";
import { Rating } from "../../model";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ColumnGraphProps {
  title: string;
  averageRating?: Rating;
  yours?: Rating;
}

export const ColumnGraph = ({ title, averageRating, yours }: ColumnGraphProps) => {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const color = darkTheme ? "#fff" : "#111";
  const gridColor = darkTheme ? "#666" : "#555";

  return (
    <Box marginX={4} marginY={2} textAlign="center">
      {averageRating ? (
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
            labels: Object.keys(averageRating).map(
              (key) => texts[key as keyof TextFields],
            ),
            datasets: [
              {
                label: "Average",
                data: Object.values(averageRating),
                backgroundColor: "#6200ea",
              },
              {
                label: "Your Rating",
                data: yours ? Object.values(yours) : [],
                backgroundColor: "#bdbdbd",
              },
            ],
          }}
        />
      ) : (
        "No Graph Because No Rating"
      )}
    </Box>
  );
};
