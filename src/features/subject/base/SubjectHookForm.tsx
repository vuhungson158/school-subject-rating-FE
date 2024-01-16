import {yupResolver} from "@hookform/resolvers/yup";
import {SubjectRequestModel} from "../../../model/subjectModel";
import {AnyObjectSchema, number, object, string} from "yup";
import {FormInputRadioGroup, FormInputSelect, FormInputSwitch, FormInputText} from "../../../HookFormInput";
import {departments, ResponseWrapper} from "../../../model/commonModel";
import {useHookForm, UseHookFormReturn} from "../../../layout/HookForm";
import {FormInputNumber} from "../../../HookFormInput/FormInputNumber";
import {SmallEnum} from "../../../model/classificationModel";
import {useAsyncOnDidMount} from "../../../app/hooks";
import teacherApi from "../../../api/teacherApi";
import {useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {TeacherResponseModel} from "../../../model/teacherModel";

export const SubjectHookForm = ({
    defaultValues,
    onSubmit,
}: {
    defaultValues: SubjectRequestModel;
    onSubmit: (subjectRequestModel: SubjectRequestModel) => void;
}) => {
    const {control, HookForm}: UseHookFormReturn<SubjectRequestModel> = useHookForm({
        defaultValues: defaultValues,
        onSubmit: onSubmit,
        resolver: yupResolver(schema),
    });

    const [teacherList, setTeacherList]: UseState<TeacherResponseModel[]> = useState<TeacherResponseModel[]>([]);

    useAsyncOnDidMount(async (): Promise<void> => {
        const responseWrapper: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
        setTeacherList(responseWrapper.data);
    })

    return (
        <HookForm>
            <FormInputText
                control={control}
                name="name"
                label="Subject Name"
            />
            <FormInputSelect
                control={control}
                name="teacherId"
                label="Teacher"
                options={teacherList.map((teacher) => ({
                    value: teacher.id, label: teacher.name
                }))}
            />
            <FormInputNumber
                control={control}
                name="credit"
                label="Credit"
            />
            <FormInputNumber
                control={control}
                name="registrableYear"
                label="Registrable Year"
            />
            <FormInputRadioGroup
                control={control}
                name="department"
                label="Department"
                options={departments.map((department) => ({
                    value: department, label: department
                }))}
            />
            <FormInputSelect
                control={control}
                name="classification"
                label="Classification"
                options={Object.values(SmallEnum).map((classification) => ({
                    value: classification, label: classification
                }))}
            />
            <FormInputSwitch
                control={control}
                name="require"
                label="Require"
            />
            <FormInputText
                control={control}
                name="semester"
                label="Semester"
            />
            <FormInputText
                control={control}
                name="schedule"
                label="Schedule"
            />
        </HookForm>
    )
}

const schema: AnyObjectSchema = object({
    name: string().required(),
    registrableYear: number().min(1).max(4).required(),
    credit: number().min(1).max(6).required(),
    teacherId: number().required(),
    department: string().required(),
    classification: string().required(),
    semester: string().required(),
    schedule: string().required(),
}).required();