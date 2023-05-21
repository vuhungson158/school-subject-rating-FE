import {
  Box,
  FormControl,
  FormHelperText,
  Slider as MuiSlider,
  Typography
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { SUCCESS_COLOR } from "../constant";

interface SliderProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  vertical?: boolean;
}

export const Slider = ({
  name,
  control,
  label,
  disabled,
  vertical,
}: SliderProps) => {
  const {
    field: { value, onChange },
    fieldState: { error, isTouched, isDirty },
  } = useController({ name, control });

  // const handleSliderChange = (
  //   event: React.ChangeEvent<{}>,
  //   value: number | number[],
  // ) => {
  //   onChange(value);
  // };

  return (
    <Box>
      <FormControl
        fullWidth
        variant="outlined"
        disabled={disabled}
        margin="normal"
        error={!!error}>
        <Typography
          id="input-slider"
          gutterBottom
          color={isTouched && isDirty ? SUCCESS_COLOR : undefined}>
          {label}
        </Typography>

        {vertical ? (
          <MuiSlider
            key="slider"
            valueLabelDisplay="auto"
            value={value || 0}
            onChange={onChange}
            aria-labelledby="input-slider"
            min={0}
            step={1}
            max={100}
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            orientation="vertical"
            onKeyDown={(event: React.KeyboardEvent) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
              }
            }}
          />
        ) : (
          <MuiSlider
            key="slider"
            max={100}
            valueLabelDisplay="auto"
            value={value || 0}
            onChange={onChange}
            aria-labelledby="input-slider"
          />
        )}

        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
