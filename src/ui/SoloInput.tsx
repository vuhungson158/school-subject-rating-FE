import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {MultiLanguageEnum, TextFields} from "../language";
import React from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {ControlledNumber, parseToControlledNumber, ReactInputEvent} from "../common/WrapperType";
import {SelectProps} from "@mui/material/Select/Select";
import {ALL, Limit, limitValues, TemplateLiteral} from "../model/templateLiteral";
import {FromTo} from "../model/commonModel";

type Option<T> = {
    label: string,
    value: T | undefined,
};

const SoloInputSelect = <T extends number | string>
({label, value, onChange, options, ...inputProps}: {
    label: string,
    value: T | undefined,
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

export const SoloInputTemplateLiteralSelect = <T extends TemplateLiteral>
({label, value, options, onChange, texts}: {
    label: string,
    value: T | undefined,
    options: ReadonlyArray<T>
    onChange: (value: T | undefined) => void,
    texts?: MultiLanguageEnum<T>
}) => {
    const menuItems: Option<T>[] = options.map<Option<T>>((option: T): Option<T> => ({
        label: texts ? texts[option] : String(option),
        value: option
    }));
    menuItems.push({label: ALL, value: undefined});

    return (
        <SoloInputSelect
            label={label}
            value={value}
            onChange={(event: SelectChangeEvent<T>): void => {
                onChange(event.target.value as T)
            }}
            options={menuItems}
        />
    )
};

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
    const cloneOptions = [...options];
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

// export const SoloInputNationalitySelect = ({value, onChange}: {
//     value: string,
//     onChange: (value: string) => void,
// }) => {
//     // TODO Nationality multi language
//     // const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
//
//     return (
//         <SoloInputEnumSelect
//             label={"Nationality"}
//             value={value}
//             onChange={onChange}
//             options={
//                 nationalities.map((nationality: Nationality): Option<string> => ({
//                     label: nationality,
//                     value: nationality
//                 }))
//             }
//         />
//     )
// }

// export const SoloInputDepartmentSelect = ({value, onChange}: {
//     value: string,
//     onChange: (value: string) => void,
// }) => {
//     return (
//         <SoloInputEnumSelect
//             label={"Department"}
//             value={value}
//             onChange={onChange}
//             options={
//                 departments.map((department: Department): Option<string> => ({
//                     label: department,
//                     value: department
//                 }))
//             }
//         />
//     )
// }

// export const SoloInputGenderSelect = ({value, onChange}: {
//     value: string,
//     onChange: (value: string) => void,
// }) => {
//     const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
//
//     return (
//         <SoloInputEnumSelect
//             label={texts.common.gender}
//             value={value}
//             onChange={onChange}
//             options={
//                 genders.map((gender: Gender): Option<string> => ({
//                     label: texts.enum.gender[gender],
//                     value: gender
//                 }))
//             }
//         />
//     )
// }

// export const SoloInputNumberFromTo = ({label, from, to}: {
//     label: string,
//     from: {
//         value: ControlledNumber,
//         onChange: (value: ControlledNumber) => void,
//     },
//     to: {
//         value: ControlledNumber,
//         onChange: (value: ControlledNumber) => void,
//     }
//
// }) => {
//     // TODO From To multi language
//     // const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
//
//     return (
//         <Box display="flex" alignItems="center">
//             <SoloInputNumber
//                 label={`${label} (from)`}
//                 value={from.value}
//                 onChange={from.onChange}
//             />
//             <ArrowRightIcon/>
//             <SoloInputNumber
//                 label={`${label} (from)`}
//                 value={to.value}
//                 onChange={to.onChange}
//             />
//         </Box>
//     )
// }

export const SoloInputNumberFromTo = ({label, value, onChange}: {
    label: string;
    value: FromTo<ControlledNumber>;
    onChange: (value: FromTo<ControlledNumber>) => void;
}) => {
    // TODO From To multi language
    // const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <Box display="flex" alignItems="center">
            <SoloInputNumber
                label={`${label} (from)`}
                value={value.from}
                onChange={(newValue: ControlledNumber) => onChange({from: newValue, to: value.to})}
            />
            <ArrowRightIcon/>
            <SoloInputNumber
                label={`${label} (from)`}
                value={value.to}
                onChange={(newValue: ControlledNumber) => onChange({from: value.from, to: newValue})}
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
