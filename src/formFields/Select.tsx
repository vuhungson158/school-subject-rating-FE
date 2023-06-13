import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { SUCCESS_COLOR } from "../constant";

interface SelectOption {
  value: string | number;
  label?: string;
  disabled?: boolean;
}

interface SelectProps {
  name: string;
  control: Control<any>;
  options: SelectOption[];
  label?: string;
  disabled?: boolean;
}

export const Select = ({ name, control, label, disabled, options }: SelectProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, isTouched, isDirty },
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
      <InputLabel
        id={`${name}_label`}
        color={isTouched && isDirty ? SUCCESS_COLOR : undefined}
        focused={isTouched && isDirty}>
        {label}
      </InputLabel>

      <MuiSelect
        labelId={`${name}_label`}
        value={value || options[0]?.value}
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
      </MuiSelect>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
