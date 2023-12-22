import {FieldValues, useForm, UseFormReturn} from "react-hook-form";
import {DEFAULT_VALIDATION_MODE} from "../constant/common";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormInputBase} from "../HookFormInput/FormInputBase";
import {FieldPath} from "react-hook-form/dist/types";
import {AnyObjectSchema} from "yup";
import {DefaultValues} from "react-hook-form/dist/types/form";

export const HookForm = <FormType extends FieldValues, InputName extends FieldPath<FormType>>({
    inputs, defaultValues, validationSchema, submitHandleCallback
}: {
    inputs: Array<(inputProps: FormInputBase<FormType, InputName>) => JSX.Element>;
    defaultValues: DefaultValues<FormType>;
    validationSchema: AnyObjectSchema;
    submitHandleCallback: (formModel: FormType) => void;
}) => {
    const {
        control,
        handleSubmit,
    }: UseFormReturn<FormType> = useForm<FormType>({
        mode: DEFAULT_VALIDATION_MODE,
        defaultValues: defaultValues,
        resolver: yupResolver(validationSchema),
        // shouldUnregister: false
    });

    return (
        <form onSubmit={handleSubmit(submitHandleCallback)}>
            {/*{inputs.map((input) => input.)}*/}
        </form>
    )
}