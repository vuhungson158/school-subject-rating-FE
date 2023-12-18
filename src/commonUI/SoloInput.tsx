import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import MuiSkeleton from '@mui/material/Skeleton';
import {Gender, genders} from "../model/commonModel";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {TextFields} from "../language";
import React from "react";
import {ALL} from "../constant";

type Option<T> = {
    label: string,
    value: T,
}

export const SoloInputSelect = <T extends number | string>({label, value, onChange, options}: {
    label: string,
    value: T,
    onChange: SelectInputProps<T>['onChange'],
    options: Array<Option<T>>
}) => {
    return (
        <FormControl sx={{minWidth: 200}}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={onChange}
            >
                {options.map((option: Option<T>) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export const SoloInputGenderSelect = ({value, onChange}: {
    value: string,
    onChange: (value: string) => void,
}) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const options: Option<string>[] = genders.map((gender: Gender): Option<string> => ({
        label: texts.enum.gender[gender],
        value: gender
    }));
    options.unshift({
        label: texts.common.all,
        value: ALL
    })

    return (
        <SoloInputSelect
            label={texts.common.gender}
            value={value}
            onChange={(event: SelectChangeEvent): void => {
                onChange(event.target.value)
            }}
            options={options}
        />
    )
}

const SoloInput = <T extends number | string>({label, value, onChange}: {
    label: T;
    value: T;
    onChange: (value: T) => void;
}) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
                onChange(event.target.value as T)
            }}
        />
    );
};

export const SoloInputText = SoloInput<string>;
export const SoloInputNumber = SoloInput<number>

export const Skeleton = () => {
    return (
        <MuiSkeleton sx={{marginY: 3}} animation="wave" variant="rounded" width="100%" height={50}/>
    );
};