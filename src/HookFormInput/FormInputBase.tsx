import {Control, FieldValues} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {PathValue} from "react-hook-form/dist/types/path/eager";

export type FormInputBase<FormType extends FieldValues, InputName extends FieldPath<FormType>> = {
    label: string;
    name: InputName;
    control: Control<FormType>;
}

export type FormInputOption<FormType extends FieldValues, InputName extends FieldPath<FormType>> = {
    value: PathValue<FormType, InputName>;
    label: string;
    disabled?: boolean;
}

export type FormChoosingInputBase<FormType extends FieldValues, InputName extends FieldPath<FormType>> = {
    options: Array<FormInputOption<FormType, InputName>>
} & FormInputBase<FormType, InputName>