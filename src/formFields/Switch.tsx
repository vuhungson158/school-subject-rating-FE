import {Box, FormControl, FormHelperText, FormLabel, Switch as MuiSwitch} from "@mui/material";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import SuccessIcon from "@mui/icons-material/CheckCircleOutline";


export const Switch = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    label,
    disabled
}: {
    name: InputName;
    control: Control<FormType>;
    label?: string;
    disabled?: boolean;
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

    const isSuccess: boolean = !error && !!value;
    return (
        <Box>
            <FormControl
                disabled={disabled}
                margin="normal"
                component="fieldset"
                error={!!error?.message}>
                <Box display="flex" justifyContent="space-between">
                    <FormLabel component="legend">{label}</FormLabel>
                    <Box>{isSuccess && <SuccessIcon sx={{marginRight: "14px"}} color="success"/>}</Box>
                </Box>
                <MuiSwitch onChange={onChange} checked={value} disabled={disabled}/>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};
