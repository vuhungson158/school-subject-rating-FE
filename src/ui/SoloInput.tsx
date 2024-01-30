import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import {MultiLanguageEnum} from "../language";
import React from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {ReactInputEvent} from "../common/WrapperType";
import {SelectProps} from "@mui/material/Select/Select";
import {ALL, Limit, limitValues, TemplateLiteralSelect} from "../model/templateLiteral";
import {UndefinedFromTo} from "../model/commonModel";

type Option<T> = {
    label: string,
    value?: T,
};

const SoloInputSelect = <T extends number | string>
({label, value, onSelected, options, ...inputProps}: {
    label: string,
    value?: T,
    onSelected: (value?: T) => void,
    options: Array<Option<T>>
} & SelectProps<T>) => {

    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value || ""}
                label={label}
                onChange={(event: SelectChangeEvent<T>): void => {
                    const newValue: T = event.target.value as T;
                    onSelected(newValue || undefined);
                }}
                sx={{minWidth: 200}}
                {...inputProps}
            >
                {options.map((option: Option<T>, index: number) => (
                    <MenuItem key={option.value + "" + index} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export const SoloInputTemplateLiteralSelect = <T extends TemplateLiteralSelect>
({label, value, options, onSelected, texts}: {
    label: string,
    value?: T,
    options: ReadonlyArray<T>
    onSelected: (value?: T) => void,
    texts?: MultiLanguageEnum<T>
}) => {
    const all: T = ALL as T;
    const menuItems: Option<T>[] = options.map<Option<T>>((option: T): Option<T> => ({
        label: texts ? texts[option] : option,
        value: option
    }));
    menuItems.unshift({label: ALL, value: all});

    return (
        <SoloInputSelect
            label={label}
            value={value === undefined ? all : value}
            onSelected={(newValue?: T): void => {
                onSelected(newValue === all ? undefined : newValue)
            }}
            options={menuItems}
        />
    )
};

export const SoloInputLimitSelect = ({label, value, onSelected}: {
    label: string,
    value: Limit,
    onSelected: (value: Limit) => void,
}) => {
    return (
        <SoloInputSelect
            label={label}
            value={String(value)}
            onSelected={(newValue?: string) => {
                onSelected(Number(newValue) as Limit)
            }}
            options={limitValues.map((value: number): Option<string> => ({
                label: String(value),
                value: String(value)
            }))}
            sx={{width: 72, height: 40}}
        />
    )
}

export const SoloInputNumberFromTo = ({label, value, onChange}: {
    label: string;
    value: UndefinedFromTo<number>;
    onChange: (value: UndefinedFromTo<number>) => void;
}) => {
    // TODO From To multi language
    // const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <Box display="flex" alignItems="center">
            <SoloInputNumber
                label={`${label} (from)`}
                value={value.from}
                onChange={(newValue?: number) => onChange({from: newValue, to: value.to})}
            />
            <ArrowRightIcon/>
            <SoloInputNumber
                label={`${label} (to)`}
                value={value.to}
                onChange={(newValue?: number) => onChange({from: value.from, to: newValue})}
            />
        </Box>
    )
}

export const SoloInputText = ({label, value, onChange}: {
    label: string;
    value?: string;
    onChange: (value?: string) => void;
}) => {
    return (
        <TextField
            label={label}
            value={value || ""}
            onChange={(event: ReactInputEvent): void => {
                const newValue: string = event.target.value;
                onChange(newValue || undefined);
            }}
        />
    )
};

export const SoloInputNumber = ({label, value, onChange}: {
    label: string;
    value?: number;
    onChange: (value?: number) => void;
}) => {
    return (
        <TextField
            type="number"
            label={label}
            value={value || ""}
            onChange={(event: ReactInputEvent): void => {
                const newValue: string = event.target.value;
                onChange(newValue ? Number(newValue) : undefined);
            }}
        />
    )
};