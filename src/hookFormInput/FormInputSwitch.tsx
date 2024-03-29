import {Box, FormHelperText, FormLabel, Switch as MuiSwitch} from "@mui/material";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";


export const FormInputSwitch = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    label = "",
    disabled,
}: {
    name: InputName;
    control: Control<FormType>;
    label?: string;
    disabled?: boolean;
    required?: boolean;
}) => {
    const {
        field: {
            value,
            onChange
        },
        fieldState: {error},
    }: UseControllerReturn<FormType, InputName> = useController({
        name,
        control
    });

    return (
        <Box marginTop={4}>
            <Box display="flex" alignItems="center">
                <FormLabel component="legend">
                    {label}
                </FormLabel>
                <MuiSwitch onChange={onChange} checked={value} disabled={disabled}/>
            </Box>
            <FormHelperText>{error?.message}</FormHelperText>
        </Box>
    );
};
