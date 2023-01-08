import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  Typography,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

interface SwitchFieldProps {
  name: string;
  control: Control;
  label?: string;
  disabled?: boolean;
}

export const SwitchField = ({
  name,
  control,
  label,
  disabled,
}: SwitchFieldProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <Box>
      <FormControl
        disabled={disabled}
        margin="normal"
        component="fieldset"
        error={!!error?.message}>
        <Typography>{label}</Typography>
        <FormControlLabel
          labelPlacement="start"
          key={value}
          control={<Switch onChange={onChange} checked={value} />}
          label={""}
          disabled={disabled}
        />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
