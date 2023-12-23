import {TextFields} from "../../../language";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {useForm, UseFormReturn} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {DEFAULT_DATE_FORMAT, DEFAULT_DATE_REGEX, DEFAULT_VALIDATION_MODE} from "../../../constant/common";
import {TeacherRequestModel} from "../../../model/teacherModel";
import {AnyObjectSchema, object, string} from "yup";
import {FormInputRadioGroup, FormInputSelect, FormInputText} from "../../../HookFormInput";
import {HookForm} from "../../../layout/HookForm";
import {Gender, genders, nationalities, Nationality} from "../../../model/commonModel";
import {FormInputOption} from "../../../HookFormInput/FormInputBase";

export const TeacherHookForm = ({
    defaultValues,
    submitHandle,
}: {
    defaultValues: TeacherRequestModel;
    submitHandle: (teacherRequestModel: TeacherRequestModel) => void;
}) => {
    // TODO
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    const {
        control,
        handleSubmit,
        reset
    }: UseFormReturn<TeacherRequestModel> = useForm<TeacherRequestModel>({
        mode: DEFAULT_VALIDATION_MODE,
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
        // TODO
        // shouldUnregister: false
    });

    return (
        <HookForm onSubmit={handleSubmit(submitHandle)} onClear={() => reset()}>
            <FormInputText
                control={control}
                name="name"
                label="Teacher Name"
            />
            <FormInputRadioGroup
                control={control}
                name="gender"
                label="Gender"
                options={genders.map((gender: Gender): FormInputOption<TeacherRequestModel, "gender"> => ({
                    value: gender, label: gender
                }))}
            />
            <FormInputSelect
                control={control}
                name="nationality"
                label="Nationality"
                options={nationalities.map(
                    (nationality: Nationality): FormInputOption<TeacherRequestModel, "nationality"> => ({
                        value: nationality, label: nationality
                    }))}
            />
            <FormInputText
                control={control}
                name="dob"
                label="Date Of Birth"
            />
        </HookForm>
    )
}

const schema: AnyObjectSchema = object({
    name: string().min(4).required(),
    nationality: string().required(),
    dob: string()
        .trim()
        .matches(DEFAULT_DATE_REGEX, DEFAULT_DATE_FORMAT)
        .required(),
}).required();