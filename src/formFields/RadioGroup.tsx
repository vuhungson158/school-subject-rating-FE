import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup as MuiRadioGroup
} from "@mui/material";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {PathValue} from "react-hook-form/dist/types/path/eager";
import React from "react";

export const RadioGroup = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    label = "",
    disabled,
    options,
    required = false
}: {
    name: InputName;
    control: Control<FormType>;
    options: Array<{
        value: PathValue<FormType, InputName>;
        label?: string | number;
        disabled?: boolean;
    }>;
    label?: string;
    disabled?: boolean;
    required?: boolean;
}) => {

    const {
        field: {
            value,
            onChange,
            onBlur
        },
        fieldState: {error},
    }: UseControllerReturn<FormType, InputName> = useController({
        name,
        control
    });

    const isSuccess: boolean = !error && !!value;

    return (
        <Box>
            <FormControl
                disabled={disabled}
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
                    {options.map((option: {
                        value: PathValue<FormType, InputName>;
                        label?: string | number;
                        disabled?: boolean
                    }) => (
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
        ;
};
