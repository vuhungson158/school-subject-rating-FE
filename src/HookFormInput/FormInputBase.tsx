import {Control, FieldValues} from "react-hook-form";
import {FieldPath} from "react-hook-form/dist/types";
import {PathValue} from "react-hook-form/dist/types/path/eager";

export interface FormInputBase<FormType extends FieldValues, InputName extends FieldPath<FormType>> {
    label: string;
    name: InputName;
    control: Control<FormType>;
    disabled?: boolean;
    required?: boolean;
}

export interface FormChoosingInputBase<FormType extends FieldValues, InputName extends FieldPath<FormType>>
    extends FormInputBase<FormType, InputName> {
    options: Array<{
        value: PathValue<FormType, InputName>;
        label: string;
        disabled?: boolean;
    }>;
}