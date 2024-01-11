import {ReactNode} from "react";
import {Button} from "@mui/material";
import {Control, SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {BaseRequestModel} from "../model/commonModel";
import {Resolver} from "react-hook-form/dist/types/resolvers";
import {DEFAULT_VALIDATION_MODE} from "../constant/common";
import {DefaultValues} from "react-hook-form/dist/types/form";
import {JustifyBox} from "../commonUI/Other";

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
        control,
        handleSubmit,
        reset
    }: UseFormReturn<FormType> = useForm<FormType>({
        mode: DEFAULT_VALIDATION_MODE,
        defaultValues: defaultValues,
        resolver: resolver,
    });

    const HookForm = ({children}: { children: ReactNode }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                {children}

                <JustifyBox sx={{marginTop: 4, minWidth: 480}}>
                    <Button size="large" variant="outlined" onClick={() => reset()}>Clear</Button>
                    <Button size="large" variant="contained" type="submit"> Submit </Button>
                </JustifyBox>
            </form>
        )
    }

    return {control, HookForm}
}

