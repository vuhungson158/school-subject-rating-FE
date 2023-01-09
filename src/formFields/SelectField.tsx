import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

interface SelectOption {
  value: string | number;
  label?: string;
  disabled?: boolean;
}

interface SelectFieldProps {
  name: string;
  control: Control<any>;
  options: SelectOption[];
  label?: string;
  disabled?: boolean;
}

export const SelectField = ({
  name,
  control,
  label,
  disabled,
  options,
}: SelectFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      variant="outlined"
      disabled={disabled}
      margin="normal"
      error={!!error}>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>

      <Select
        labelId={`${name}_label`}
        value={value || options[0].value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}>
        {options.map((option) => (
          <MenuItem
            ref={ref}
            key={option.value}
            value={option.value}
            disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
