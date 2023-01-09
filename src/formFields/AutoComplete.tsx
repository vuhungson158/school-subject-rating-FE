import { Autocomplete, TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface AutocompleteProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control<any>;
  label?: string;
  options: SelectOption[];
  disabled?: boolean;
}

export const AutoComplete = ({
  name,
  control,
  label,
  disabled,
  options,
  ...inputProps
}: AutocompleteProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Autocomplete
      value={value ? options.find((option) => option.value === value) : options[0]}
      options={options}
      getOptionLabel={(option: SelectOption) => option.label}
      onChange={(_, data) => onChange(data?.value)}
      onBlur={onBlur}
      ref={ref}
      renderInput={() => (
        <TextField
          inputProps={inputProps}
          error={!!error}
          label={label}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};
