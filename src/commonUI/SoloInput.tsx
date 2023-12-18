import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material"
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import MuiSkeleton from '@mui/material/Skeleton';
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import {Gender, genders} from "../model/commonModel";
import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {TextFields} from "../language";

type Option<T> = {
    label: string,
    value: T,
}

export const SimpleSelect = <T extends number | string>({label, value, onChange, options}: {
    label: string,
    value: T,
    onChange: SelectInputProps<T>['onChange'],
    options: Array<Option<T>>
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={onChange}
            >
                {options.map((option: Option<T>) => <MenuItem value={option.value}>{option.label}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export const GenderSelect = ({value, onChange}: {
    value: string,
    onChange: SelectInputProps<string>['onChange'],
}) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    return (
        <SimpleSelect
            label={texts.common.gender}
            value={value}
            onChange={onChange}
            options={genders.map((gender: Gender): Option<string> => ({
                label: texts.enum.gender[gender],
                value: gender
            }))}
        />
    )
}

export const SoloInputText = ({label, value, onChange}: {
    label: string;
    value: string;
    onChange: StandardInputProps['onChange'];
}) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
        />
    );
};

export const SoloInputNumber = ({label, value, onChange}: {
    label: string;
    value: number;
    onChange: StandardInputProps['onChange'];
}) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
        />
    );
};

export const Skeleton = () => {
    return (
        <MuiSkeleton sx={{marginY: 3}} animation="wave" variant="rounded" width="100%" height={50}/>
    );
};