import {TextFields} from "../../../language";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {yupResolver} from "@hookform/resolvers/yup";
import {DEFAULT_DATE_FORMAT, DEFAULT_DATE_REGEX} from "../../../constant/common";
import {TeacherRequestModel} from "../../../model/teacherModel";
import {AnyObjectSchema, object, string} from "yup";
import {FormInputRadioGroup, FormInputSelect, FormInputText} from "../../../HookFormInput";
import {Gender, genders, nationalities, Nationality} from "../../../model/commonModel";
import {FormInputOption} from "../../../HookFormInput/FormInputBase";
import {useHookForm, UseHookFormReturn} from "../../../layout/HookForm";

export const TeacherHookForm = ({
    defaultValues,
    submitHandle,
}: {
    defaultValues: TeacherRequestModel;
    submitHandle: (teacherRequestModel: TeacherRequestModel) => void;
}) => {
    // TODO
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    const {control, HookForm}: UseHookFormReturn<TeacherRequestModel> = useHookForm({
        defaultValues: defaultValues,
        onSubmit: submitHandle,
        resolver: yupResolver(schema),
    });

    return (
        <HookForm>
            <FormInputText
                control={control}
                name="name"
                label="Teacher Name"
            />
            <FormInputText
                control={control}
                name="furigana"
                label="Furigana"
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
    furigana: string().required(),
    nationality: string().required(),
    dob: string()
        .trim()
        .matches(DEFAULT_DATE_REGEX, DEFAULT_DATE_FORMAT)
        .required(),
}).required();