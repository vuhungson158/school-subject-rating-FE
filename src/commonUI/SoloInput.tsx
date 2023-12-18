import {FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import MuiSkeleton from '@mui/material/Skeleton';

type Option<T> = {
    label: string,
    value: T,
}

export const SimpleSelect = <T extends number | string>({label, value, onChange, options}: {
    label: string,
    value: T,
    onChange: (value: T) => void,
    options: Array<Option<T>>
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={(event: SelectChangeEvent<T>) => onChange(event.target.value as T)}
            >
                {options.map((option: Option<T>) => <MenuItem value={option.value}>{option.label}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export const GenderSelect = () => {

}

export const Skeleton = () => {
    return (
        <MuiSkeleton sx={{marginY: 3}} animation="wave" variant="rounded" width="100%" height={50}/>
    );
};