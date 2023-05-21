import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from "@mui/material";
import React from "react";
import { Control, useController } from "react-hook-form";
import { SUCCESS_COLOR } from "../constant";

interface CheckboxOption {
  value: number;
  label?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  name: string;
  control: Control;
  options: CheckboxOption[];
  label?: string;
  disabled?: boolean;
}
export const CheckboxGroup = ({
  name,
  control,
  options,
  disabled,
  label,
}: CheckboxGroupProps) => {
  const {
    fieldState: { error, isTouched, isDirty },
    field: { value, onChange },
  } = useController({ name, control });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let values = value as Array<number>;
    const currentValue = parseInt(event.currentTarget.value);
    values.includes(currentValue)
      ? onChange(values.filter((value) => value !== currentValue))
      : onChange([...values, currentValue]);
  };

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
        <FormGroup row>
          {options.map((option) => (
            <FormControlLabel
              labelPlacement="start"
              label={option.label}
              key={option.value}
              disabled={option.disabled}
              control={
                <Checkbox
                  onChange={handleChange}
                  name={name}
                  value={option.value}
                  checked={value?.includes(option.value)}
                />
              }
            />
          ))}
        </FormGroup>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
