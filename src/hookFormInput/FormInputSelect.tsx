import {FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect} from "@mui/material";
import {FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {FormChoosingInputBase, FormInputOption} from "./FormInputBase";

export const FormInputSelect = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name, control, label, options,
}: FormChoosingInputBase<FormType, InputName>) => {
    const {
        field: {value, onChange, onBlur, ref},
        fieldState: {error},
    }: UseControllerReturn<FormType, InputName> = useController({name, control});

    return (
        <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!error}>

            <InputLabel>{label}</InputLabel>

            <MuiSelect
                value={value}
                defaultValue=""
                onChange={onChange}
                onBlur={onBlur}
                label={label}>
                {options.map((option: FormInputOption<FormType, InputName>) => (
                    <MenuItem
                        ref={ref}
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};
