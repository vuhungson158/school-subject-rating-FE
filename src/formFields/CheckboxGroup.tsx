import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@mui/material";
import React from "react";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {PathValue} from "react-hook-form/dist/types/path/eager";
import SuccessIcon from "@mui/icons-material/CheckCircleOutline";


export const CheckboxGroup = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    options,
    disabled,
    label,
}: {
    name: InputName;
    control: Control<FormType>;
    options: Array<{
        value: PathValue<FormType, InputName>;
        label?: string;
        disabled?: boolean;
    }>;
    label?: string;
    disabled?: boolean;
}) => {
    const {
        field: {
            value,
            onChange
        },
        fieldState: {
            error,
        },
    }: UseControllerReturn<FormType, InputName> = useController({
        name,
        control
    });

    const isSuccess: boolean = !error && !!value;

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        let values = value as Array<number>;
        const currentValue = parseInt(event.currentTarget.value);
        values.includes(currentValue)
            ? onChange(values.filter((value) => value !== currentValue))
            : onChange([...values, currentValue]);
    };

    return (
        <Box>
            <FormControl
                disabled={disabled}
                margin="normal"
                component="fieldset"
                error={!!error}>
                <Box display="flex" justifyContent="space-between">
                    <FormLabel component="legend">{label}</FormLabel>
                    <Box>{isSuccess && <SuccessIcon sx={{marginRight: "14px"}} color="success"/>}</Box>
                </Box>
                <FormGroup row>
                    {options.map((option) => (
                        <FormControlLabel
                            labelPlacement="start"
                            label={option.label}
                            key={option.value}
                            disabled={option.disabled}
                            control={
                                <Checkbox
                                    onChange={handleChange}
                                    name={name}
                                    value={option.value}
                                    checked={value?.includes(option.value)}
                                />
                            }
                        />
                    ))}
                </FormGroup>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};
