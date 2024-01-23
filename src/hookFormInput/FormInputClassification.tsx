import {Control, FieldValues, useController, UseControllerReturn} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {Box, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select as MuiSelect} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {Label} from "../commonUI";
import {useEffect, useState} from "react";
import {
    BigClass,
    MiddleClass,
    NestedBig,
    NestedMiddle,
    NestedSmall
} from "../model/classificationModel";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

export const FormInputClassification = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
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

    const nestedBig: NestedBig = useAppSelector((root: RootState) => root.subjectPlan.bigList.nested);
    const [big, setBig] = useState<BigClass>("BASIC_GENERAL");
    const [middle, setMiddle] = useState<MiddleClass>("GENERAL_EDUCATION");
    const nestedMiddle: NestedMiddle = nestedBig[big]?.child as NestedMiddle;
    const nestedSmall: NestedSmall[] = nestedMiddle[middle]?.child as NestedSmall[];

    useEffect(() => {
        const keys = Object.keys(nestedMiddle) as MiddleClass[];
        setMiddle(keys[0])
    }, [big, nestedMiddle]);

    useEffect(() => {
        onChange(nestedSmall[0].name);
    }, [nestedSmall, onChange]);

    const isSuccess: boolean = !error && !!value;

    return (
        <Box>
            <Box sx={{marginBottom: 2}}>
                <FormLabel>
                    <Label label={label} required={required}/>
                </FormLabel>
            </Box>

            {/*Big Class*/}
            <FormControl fullWidth>
                <InputLabel id="bigGroup">Big</InputLabel>
                <MuiSelect
                    label="Big"
                    labelId="bigGroup"
                    value={big}
                    onChange={(event: SelectChangeEvent<BigClass>) => setBig(event.target.value as BigClass)}
                >
                    {Object.entries(nestedBig).map(([key, {label}]) => (
                        <MenuItem
                            ref={ref}
                            key={key}
                            value={key}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>

            {/*Middle Class*/}
            <FormControl fullWidth margin="dense">
                <InputLabel id="middleGroup">Middle</InputLabel>
                <MuiSelect
                    label="Middle"
                    labelId="middleGroup"
                    value={middle}
                    onChange={(event: SelectChangeEvent<MiddleClass>) => setMiddle(event.target.value as MiddleClass)}
                >
                    {Object.entries(nestedMiddle).map(([key, {label}]) => (
                        <MenuItem
                            ref={ref}
                            key={key}
                            value={key}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>

            {/*Small Class*/}
            <FormControl
                fullWidth
                margin="dense"
                disabled={disabled}
                error={!!error}
            >
                <InputLabel id="smallGroup">Small</InputLabel>
                <MuiSelect
                    label="Small"
                    labelId="smallGroup"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                >
                    {nestedSmall.map(({
                        name,
                        label
                    }) => (
                        <MenuItem
                            ref={ref}
                            key={name}
                            value={name}>
                            {label}
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>
            <FormHelperText>{error?.message}</FormHelperText>
        </Box>

    )
}