import {Box, FormControl, FormHelperText, FormLabel, Slider as MuiSlider} from "@mui/material";
import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import React from "react";
import SuccessIcon from "@mui/icons-material/CheckCircleOutline";
import {Label} from "../commonUI";

export const FormInputSlider = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    name,
    control,
    label = "",
    disabled,
    vertical,
    required = false
}: {
    name: InputName;
    control: Control<FormType>;
    label?: string;
    disabled?: boolean;
    vertical?: boolean;
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

    const isSuccess: boolean = !error && !!value;

    // const handleSliderChange = (
    //   event: React.ChangeEvent<{}>,
    //   value: number | number[],
    // ) => {
    //   onChange(value);
    // };

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

                {vertical ? (
                    <MuiSlider
                        key="slider"
                        valueLabelDisplay="auto"
                        value={value || 0}
                        onChange={onChange}
                        aria-labelledby="input-slider"
                        min={0}
                        step={1}
                        max={100}
                        sx={{
                            '& input[type="range"]': {
                                WebkitAppearance: "slider-vertical",
                            },
                        }}
                        orientation="vertical"
                        onKeyDown={(event: React.KeyboardEvent) => {
                            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                                event.preventDefault();
                            }
                        }}
                    />
                ) : (
                    <MuiSlider
                        key="slider"
                        max={100}
                        valueLabelDisplay="auto"
                        value={value || 0}
                        onChange={onChange}
                        aria-labelledby="input-slider"
                    />
                )}

                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};
