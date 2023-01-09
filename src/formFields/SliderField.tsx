import { Box, FormControl, FormHelperText, Slider, Typography } from "@mui/material";
import { Control, useController } from "react-hook-form";

interface SliderFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  vertical?: boolean;
}

export const SliderField = ({
  name,
  control,
  label,
  disabled,
  vertical,
}: SliderFieldProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
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
        <Typography id="input-slider" gutterBottom>
          {label}
        </Typography>

        {vertical ? (
          <Slider
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
          <Slider
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
