import {InputAdornment, TextField} from "@mui/material";
import {InputHTMLAttributes} from "react";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import {FieldPath} from "react-hook-form/dist/types";

export const TextNumber = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    label,
    multiline = false,
    ...inputProps
}: {
    name: InputName;
    control: Control<FormType>;
    label?: string;
    multiline?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) => {

    const {
        field: {value, onChange, onBlur, ref},
        fieldState: {error, isTouched, isDirty},
    }: UseControllerReturn<FormType, InputName> = useController({name, control});

    const isSuccess = !error && isTouched && isDirty;

    return (
        <TextField
            fullWidth
            multiline={multiline}
            margin="normal"
            variant="outlined"
            value={value}
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
