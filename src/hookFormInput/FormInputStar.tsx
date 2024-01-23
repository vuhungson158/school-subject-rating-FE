import {Box, FormControl, FormHelperText, FormLabel, Rating} from "@mui/material";
import React, {useState} from "react";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import SuccessIcon from "@mui/icons-material/CheckCircleOutline";
import {Label} from "../ui";

export const FormInputStar = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    label = "",
    disabled,
    required = false
}: {
    name: InputName;
    control: Control<FormType>;
    label?: string;
    disabled?: boolean;
    required?: boolean;
}) => {

    const [hover, setHover] = useState(-1);

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

    return (
        <Box>
            <FormControl
                fullWidth
                variant="outlined"
                disabled={disabled}
                margin="normal"
                error={!!error}>
                <Box display="flex" justifyContent="space-between">
                    <FormLabel component="legend">
                        {<Label label={label} required={required}/>}
                    </FormLabel>
                    <Box>{isSuccess && <SuccessIcon sx={{marginRight: "14px"}} color="success"/>}</Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    <Rating
                        max={10}
                        value={Number(value) || 0}
                        onChange={(_, value) => onChange(value)}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    <Box>{hover !== -1 ? hover : value}</Box>
                </Box>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};
