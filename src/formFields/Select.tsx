import {FormControl, FormHelperText, FormLabel, MenuItem, Select as MuiSelect} from "@mui/material";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {PathValue} from "react-hook-form/dist/types/path/eager";
import {AsteriskLabel} from "../widget";

export const Select = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
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
        label?: string;
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
            onBlur,
            ref
        },
        fieldState: {error},
    }: UseControllerReturn<FormType, InputName> = useController({
        name,
        control,
    });

    const include: boolean = options.some(option => option.value === value);
    // const isSuccess: boolean = !error && !!value && include;

    return (
        <FormControl
            fullWidth
            variant="outlined"
            disabled={disabled}
            margin="normal"
            error={!!error}>

            <FormLabel sx={{
                marginBottom: -1,
                marginLeft: 1,
                fontSize: "small"
            }}>
                <AsteriskLabel label={label} required={required}/>
            </FormLabel>

            <MuiSelect
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                // endAdornment={isSuccess && (
                //     <InputAdornment position="end">
                //         <SuccessIcon color="success"/>
                //     </InputAdornment>
                // )}
                label={
                    <FormLabel sx={{
                        marginBottom: -2,
                        marginLeft: 1
                    }}>
                        <AsteriskLabel label={label} required={required}/>
                    </FormLabel>
                }>
                {!include &&
                    <MenuItem
                        ref={ref}
                        value={value}>
                        選択してください
                    </MenuItem>
                }

                {options.map((option) => (
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
