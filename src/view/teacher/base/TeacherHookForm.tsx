import {yupResolver} from "@hookform/resolvers/yup";
import {TeacherRequestModel} from "../../../model/teacherModel";
import {AnyObjectSchema, object, string} from "yup";
import {FormInputRadioGroup, FormInputSelect, FormInputText} from "../../../hookFormInput";
import {FormInputOption} from "../../../hookFormInput/FormInputBase";
import {useHookForm, UseHookFormReturn} from "../../../hookFormInput/HookForm";
import {Gender, genders, nationalities, Nationality} from "../../../model/templateLiteral";
import {DEFAULT_DATE_FORMAT, DEFAULT_DATE_REGEX} from "../../../common/constant";

export const TeacherHookForm = ({
    defaultValues,
    onSubmit,
}: {
    defaultValues: TeacherRequestModel;
    onSubmit: (teacherRequestModel: TeacherRequestModel) => void;
}) => {
    // TODO
    // const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    const {control, HookForm}: UseHookFormReturn<TeacherRequestModel> = useHookForm({
        defaultValues: defaultValues,
        onSubmit: onSubmit,
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