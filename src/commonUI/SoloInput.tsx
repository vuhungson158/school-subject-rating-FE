import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import {
    Department,
    departments,
    Gender,
    genders,
    Limit,
    limitValues,
    nationalities,
    Nationality
} from "../model/commonModel";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {TextFields} from "../language";
import React from "react";
import {ALL} from "../constant/common";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {ControlledNumber, parseToControlledNumber, ReactInputEvent} from "../common/WrapperType";
import {SelectProps} from "@mui/material/Select/Select";

type Option<T> = {
    label: string,
    value: T,
};

const SoloInputSelect = <T extends number | string>({label, value, onChange, options, ...inputProps}: {
    label: string,
    value: T,
    onChange: SelectInputProps<T>['onChange'],
    options: Array<Option<T>>
} & SelectProps<T>) => {
    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={onChange}
                sx={{minWidth: 200}}
                {...inputProps}
            >
                {options.map((option: Option<T>) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export const SoloInputLimitSelect = ({label, value, onChange}: {
    label: string,
    value: Limit,
    onChange: (value: Limit) => void,
}) => {
    return (
        <SoloInputSelect
            label={label}
            value={String(value)}
            onChange={(event: SelectChangeEvent): void => {
                onChange(Number(event.target.value) as Limit)
            }}
            options={limitValues.map((value: number): Option<string> => ({
                label: String(value),
                value: String(value)
            }))}
            sx={{width: 72, height: 40}}
        />
    )
}

const SoloInputEnumSelect = ({label, value, options, onChange}: {
    label: string,
    value: string,
    options: Option<string>[]
    onChange: (value: string) => void,
}) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const cloneOptions: Option<string>[] = [...options];
    cloneOptions.unshift({
        label: texts.common.all,
        value: ALL
    })

    return (
        <SoloInputSelect
            label={label}
            value={value}
            onChange={(event: SelectChangeEvent): void => {
                onChange(event.target.value)
            }}
            options={cloneOptions}
        />
    )
}

export const SoloInputNationalitySelect = ({value, onChange}: {
    value: string,
    onChange: (value: string) => void,
}) => {
    // TODO Nationality multi language
    // const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <SoloInputEnumSelect
            label={"Nationality"}
            value={value}
            onChange={onChange}
            options={
                nationalities.map((nationality: Nationality): Option<string> => ({
                    label: nationality,
                    value: nationality
                }))
            }
        />
    )
}

export const SoloInputDepartmentSelect = ({value, onChange}: {
    value: string,
    onChange: (value: string) => void,
}) => {
    return (
        <SoloInputEnumSelect
            label={"Department"}
            value={value}
            onChange={onChange}
            options={
                departments.map((department: Department): Option<string> => ({
                    label: department,
                    value: department
                }))
            }
        />
    )
}

export const SoloInputGenderSelect = ({value, onChange}: {
    value: string,
    onChange: (value: string) => void,
}) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <SoloInputEnumSelect
            label={texts.common.gender}
            value={value}
            onChange={onChange}
            options={
                genders.map((gender: Gender): Option<string> => ({
                    label: texts.enum.gender[gender],
                    value: gender
                }))
            }
        />
    )
}

export const SoloInputNumberFromTo = ({label, from, to}: {
    label: string,
    from: {
        value: ControlledNumber,
        onChange: (value: ControlledNumber) => void,
    },
    to: {
        value: ControlledNumber,
        onChange: (value: ControlledNumber) => void,
    }

}) => {
    // TODO From To multi language
    // const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <Box display="flex" alignItems="center">
            <SoloInputNumber
                label={`${label} (from)`}
                value={from.value}
                onChange={from.onChange}
            />
            <ArrowRightIcon/>
            <SoloInputNumber
                label={`${label} (from)`}
                value={to.value}
                onChange={to.onChange}
            />
        </Box>
    )
}

export const SoloInputText = ({label, value, onChange}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={(event: ReactInputEvent): void => {
                onChange(event.target.value)
            }}
        />
    )
};

export const SoloInputNumber = ({label, value, onChange}: {
    label: string;
    value: ControlledNumber;
    onChange: (value: ControlledNumber) => void;
}) => {
    return (
        <TextField
            type="number"
            label={label}
            value={value}
            onChange={(event: ReactInputEvent): void => {
                onChange(parseToControlledNumber(event.target.value))
            }}
        />
    )
};
