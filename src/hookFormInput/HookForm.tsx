import {ReactNode} from "react";
import {Control, SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {BaseRequestModel} from "../model/commonModel";
import {Resolver} from "react-hook-form/dist/types/resolvers";
import {DefaultValues} from "react-hook-form/dist/types/form";
import {AsyncButton, JustifyBox, NormalButton} from "../ui";

interface UseHookFormParam<FormType extends BaseRequestModel> {
    defaultValues: DefaultValues<FormType>;
    onSubmit: SubmitHandler<FormType>;
    resolver?: Resolver<FormType>;
}

export interface UseHookFormReturn<FormType extends BaseRequestModel> {
    control: Control<FormType>;
    HookForm: ({children}: { children: ReactNode }) => JSX.Element
}

export const useHookForm = <FormType extends BaseRequestModel>({
    defaultValues, onSubmit, resolver
}: UseHookFormParam<FormType>): UseHookFormReturn<FormType> => {
    const {
        control, handleSubmit, reset,
        formState: {isSubmitting}
    }: UseFormReturn<FormType> = useForm<FormType>({
        mode: "onTouched",
        defaultValues: defaultValues,
        resolver: resolver,
    });

    const HookForm = ({children}: { children: ReactNode }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                {children}

                <JustifyBox sx={{marginTop: 4, minWidth: 480}}>
                    <NormalButton size="large" onClick={() => reset()}> Clear </NormalButton>
                    <AsyncButton size="large" type="submit" isLoading={isSubmitting}> Submit </AsyncButton>
                </JustifyBox>
            </form>
        )
    }

    return {control, HookForm}
}

