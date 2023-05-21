import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch as MuiSwitch,
  Typography
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { SUCCESS_COLOR } from "../constant";

interface SwitchProps {
  name: string;
  control: Control;
  label?: string;
  disabled?: boolean;
}

export const Switch = ({ name, control, label, disabled }: SwitchProps) => {
  const {
    field: { value, onChange },
    fieldState: { error, isTouched, isDirty },
  } = useController({ name, control });
  return (
    <Box>
      <FormControl
        disabled={disabled}
        margin="normal"
        component="fieldset"
        error={!!error?.message}>
        <Typography color={isTouched && isDirty ? SUCCESS_COLOR : undefined}>
          {label}
        </Typography>
        <FormControlLabel
          labelPlacement="start"
          key={value}
          control={<MuiSwitch onChange={onChange} checked={value} />}
          label=""
          disabled={disabled}
        />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
