import { Box, FormControl, FormHelperText, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { SUCCESS_COLOR } from "../constant";

interface StarProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export const Star = ({ name, control, label, disabled }: StarProps) => {
  const [hover, setHover] = useState(-1);

  const {
    field: { value, onChange },
    fieldState: { error, isTouched, isDirty },
  } = useController({ name, control });

  return (
    <Box>
      <FormControl
        fullWidth
        variant="outlined"
        disabled={disabled}
        margin="normal"
        error={!!error}>
        <Typography
          id="input-star"
          gutterBottom
          color={isTouched && isDirty ? SUCCESS_COLOR : undefined}>
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
