import { Box, FormControl, FormHelperText, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { Control, useController } from "react-hook-form";

interface StarFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export const StarField = ({ name, control, label, disabled }: StarFieldProps) => {
  const [hover, setHover] = useState(-1);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Rating
            max={10}
            value={Number(value) || 0}
            onChange={(_, value) => onChange(value)}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          <Box>{hover !== -1 ? hover : value}</Box>
        </Box>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};
