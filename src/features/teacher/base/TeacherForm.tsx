import {TextFields} from "../../../language";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {useForm, UseFormReturn} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {DEFAULT_DATE_FORMAT, DEFAULT_DATE_REGEX, DEFAULT_VALIDATION_MODE} from "../../../constant/common";
import {TeacherRequestModel} from "../../../model/teacherModel";
import {AnyObjectSchema, object, string} from "yup";
import {FormInputRadioGroup, FormInputText} from "../../../HookFormInput";
import {Button, CircularProgress} from "@mui/material";

export const TeacherForm = ({
    defaultValues,
    submitHandleCallback,
    submitButtonLabel
}: {
    defaultValues: TeacherRequestModel;
    submitHandleCallback: (teacherRequestModel: TeacherRequestModel) => void;
    submitButtonLabel?: string;
}) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    const {
        control,
        handleSubmit,
    }: UseFormReturn<TeacherRequestModel> = useForm<TeacherRequestModel>({
        mode: DEFAULT_VALIDATION_MODE,
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
        // shouldUnregister: false
    });
    return (
        <form onSubmit={handleSubmit(submitHandleCallback)}>
            <FormInputText
                name="name"
                control={control}
                label="Teacher Name"
            />
            <FormInputRadioGroup
                name="gender"
                control={control}
                label="Gender"
                options={[
                    {value: "MALE", label: "Male"},
                    {value: "FEMALE", label: "Felmale"},
                ]}
            />
            <FormInputText
                name="nationality"
                control={control}
                label="Nationality"
            />
            <FormInputText
                name="dob"
                control={control}
                label="Date Of Birth"
            />

            <Button
                sx={{marginTop: 4}}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}>
                {isLoading ? <CircularProgress/> : "Add"}
            </Button>
        </form>
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