import {Autocomplete, TextField} from "@mui/material";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {PathValue} from "react-hook-form/dist/types/path/eager";
import {AsteriskLabel} from "../widget";

export const AutoComplete = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    label = "",
    disabled,
    options,
    required = false,
    ...inputProps
}: {
    name: InputName;
    control: Control<FormType>;
    label?: string;
    options: Array<{
        value: PathValue<FormType, InputName>;
        label: string;
        disabled?: boolean;
    }>;
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
        control
    });

    const isSuccess: boolean = !error && !!value;

    return (
        <Autocomplete
            value={value ? options.find((option) => option.value === value) : options[0]}
            options={options}
            getOptionLabel={(option) => option.label}
            onChange={(_, data) => onChange(data?.value)}
            onBlur={onBlur}
            ref={ref}
            renderInput={() => (
                <TextField
                    inputProps={inputProps}
                    error={!!error}
                    label={<AsteriskLabel label={label} required={required}/>}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        // endAdornment: isSuccess && (
                        //     <InputAdornment position="end">
                        //         <SuccessIcon color="success"/>
                        //     </InputAdornment>
                        // ),
                    }}
                />
            )}
        />
    );
};
