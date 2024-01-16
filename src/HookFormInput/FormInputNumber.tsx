import {TextField} from "@mui/material";
import {InputHTMLAttributes} from "react";
import {FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {FormInputBase} from "./FormInputBase";

export const FormInputNumber = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name, control, label, ...inputProps
}: FormInputBase<FormType, InputName> & InputHTMLAttributes<HTMLInputElement>) => {
    const {
        field: {value, onChange, onBlur, ref},
        fieldState: {error}
    }: UseControllerReturn<FormType, InputName> = useController({name, control});

    return (
        <TextField
            fullWidth
            type="number"
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
        />
    );
};
