import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { SUCCESS_COLOR } from "../constant";

interface RadioOption {
  value: string | number;
  label?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  control: Control<any>;
  options: RadioOption[];
  label?: string;
  disabled?: boolean;
}

export const RadioGroup = ({
  name,
  control,
  label,
  disabled,
  options,
}: RadioGroupProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error, isTouched, isDirty },
  } = useController({
    name,
    control,
  });

  return (
    <Box>
      <FormControl
        disabled={disabled}
        margin="normal"
        component="fieldset"
        error={!!error}>
        <FormLabel
          component="legend"
          color={isTouched && isDirty ? SUCCESS_COLOR : undefined}
          focused={isTouched && isDirty}>
          {label}
        </FormLabel>

        <MuiRadioGroup
          row
          aria-label="gender"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}>
          {options.map((option) => (
            <FormControlLabel
              sx={{ marginX: 4 }}
              labelPlacement="start"
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              disabled={option.disabled}
            />
          ))}
        </MuiRadioGroup>

        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
