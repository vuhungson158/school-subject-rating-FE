import { TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control<any>;
  label?: string;
  multiline?: boolean;
}

export const TextNumberField = ({
  name,
  control,
  label,
  multiline = false,
  ...inputProps
}: InputFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      multiline={multiline}
      margin="normal"
      variant="outlined"
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      inputRef={ref}
      error={!!error?.message}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};
