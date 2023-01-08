import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { Control, useController } from "react-hook-form";

interface RadioOption {
  value: string | number;
  label?: string;
  disabled?: boolean;
}

interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  options: RadioOption[];
  label?: string;
  disabled?: boolean;
}

export const RadioGroupField = ({
  name,
  control,
  label,
  disabled,
  options,
}: RadioGroupFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
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
        <FormLabel component="legend">{label}</FormLabel>

        <RadioGroup
          row
          aria-label="gender"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}>
          {options.map((option) => (
            <FormControlLabel
              labelPlacement="start"
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              disabled={option.disabled}
            />
          ))}
        </RadioGroup>

        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
