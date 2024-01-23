import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup as MuiRadioGroup
} from "@mui/material";
import {FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import React from "react";
import {FormChoosingInputBase, FormInputOption} from "./FormInputBase";


export const FormInputRadioGroup = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name, control, label, options
}: FormChoosingInputBase<FormType, InputName>) => {
    const {
        field: {value, onChange, onBlur},
        fieldState: {error},
    }: UseControllerReturn<FormType, InputName> = useController({name, control});

    return (
        <Box>
            <FormControl
                margin="normal"
                component="fieldset"
                fullWidth
                error={!!error}>
                <FormLabel component="legend">{label}</FormLabel>
                <MuiRadioGroup
                    row
                    aria-label="gender"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}>
                    {options.map((option: FormInputOption<FormType, InputName>) => (
                        <FormControlLabel
                            sx={{marginX: 4}}
                            labelPlacement="start"
                            key={option.value}
                            value={option.value}
                            control={<Radio/>}
                            label={option.label}
                            disabled={option.disabled}
                        />
                    ))}
                </MuiRadioGroup>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    )
}

