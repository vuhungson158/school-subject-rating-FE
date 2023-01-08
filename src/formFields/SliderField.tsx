import { Box, FormControl, FormHelperText, Slider, Typography } from "@mui/material";
import { Control, useController } from "react-hook-form";

interface SliderFieldProps {
  name: string;
  control: Control;
  label?: string;
  disabled?: boolean;
}

export const SliderField = ({
  name,
  control,
  label,
  disabled,
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

        <Slider
          key="slider"
          valueLabelDisplay="auto"
          value={value || 0}
          onChange={onChange}
          aria-labelledby="input-slider"
        />

        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
