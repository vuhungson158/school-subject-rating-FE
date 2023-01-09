import { Box, FormControl, FormHelperText, Rating, Typography } from "@mui/material";
import { Control, useController } from "react-hook-form";

interface StarFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export const StarField = ({
  name,
  control,
  label,
  disabled,
}: StarFieldProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Box>
      <FormControl
        fullWidth
        variant="outlined"
        disabled={disabled}
        margin="normal"
        error={!!error}>
        <Typography id="input-star" gutterBottom>
          {label}
        </Typography>

        <Rating max={10} value={Number(value) || 0} onChange={onChange} />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
