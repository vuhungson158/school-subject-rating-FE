import {InputAdornment, TextField} from "@mui/material";
import {InputHTMLAttributes} from "react";
import {Control, useController, UseControllerReturn} from "react-hook-form";
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';

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
        field: {value, onChange, onBlur, ref},
        fieldState: {error, isTouched, isDirty},
    }: UseControllerReturn<Record<string, string | number>, string> = useController({
        name,
        control,
    });

    const isSuccess = !error && isTouched && isDirty;
    const isSuccess2 = !error && isTouched && isDirty;

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
            InputProps={{
                endAdornment: isSuccess && (
                    <InputAdornment position="end">
                        <SuccessIcon color="success"/>
                    </InputAdornment>
                ),
            }}
        />
    );
};
