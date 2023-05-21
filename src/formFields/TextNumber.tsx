import { TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
import { SUCCESS_COLOR } from "../constant";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control<any>;
  label?: string;
  multiline?: boolean;
}

export const TextNumber = ({
  name,
  control,
  label,
  multiline = false,
  ...inputProps
}: InputProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, isTouched, isDirty },
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
      focused={isTouched && isDirty}
      color={isTouched && isDirty ? SUCCESS_COLOR : undefined}
      error={!!error?.message}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};
