import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, CircularProgress, DialogTitle} from "@mui/material";
import {useForm, UseFormReturn} from "react-hook-form";
import {number, object, string} from "yup";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {RadioGroup, Select, Skeleton, Switch, TextNumber} from "../../../formFields";
import {SubjectEntity, initSubjectRequest, SubjectRequest} from "../../../model/subjectModel";
import {useParams} from "react-router-dom";
import {Entity as TeacherEntity} from "../../teacher/base/model";
import subjectThunk from "../../../thunk/subjectThunk";
import {departments} from "../../../common/model";
import {TextFields} from "../../../language";
import api from "../../../api/subjectApi";
import {RouterPop} from "../../../widget";
import {useEffect, useState} from "react";

export const EditForm = () => {

    const {
        id
    } = useParams<{
        id: string
    }>();
    const subjectId: number = Number(id);

    const dispatch = useAppDispatch();
    const [defaultValues, setDefaultValues] = useState<SubjectEntity>();

    useEffect(() => {
        (async (id: number): Promise<void> => {
            const response = await api.getById(id);
            setDefaultValues(response.data);
        })(subjectId)

    }, [subjectId]);

    return (
        <RouterPop>
            <DialogTitle textAlign="center" fontSize={48}>
                Edit
            </DialogTitle>
            {
                defaultValues
                    ? <FormFields
                        defaultValues={defaultValues}
                        submitHandleCallback={(subject: SubjectRequest) => dispatch(subjectThunk.edit(subjectId, subject))}
                    />
                    : <FormSkeleton/>
            }
        </RouterPop>
    );
};

export const AddForm = () => {
    const dispatch = useAppDispatch();

    return (
        <RouterPop>
            <DialogTitle textAlign="center" fontSize={48}>
                Add
            </DialogTitle>
            <FormFields
                defaultValues={initSubjectRequest}
                submitHandleCallback={(subject: SubjectRequest) => dispatch(subjectThunk.add(subject))}
            />
        </RouterPop>
    );
}

const FormFields = ({
    defaultValues,
    submitHandleCallback,
    submitButtonLabel
}: {
    defaultValues: SubjectRequest;
    submitHandleCallback: (subject: SubjectRequest) => void;
    submitButtonLabel?: string;
}) => {

    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const isLoading: boolean = useAppSelector((state: RootState) => state.subject.isLoading);
    const teacherList: TeacherEntity[] = useAppSelector((state: RootState) => state.teacher.list);
    const smallOptions = useAppSelector((state: RootState) => state.subjectPlan.bigList.smalls);

    const schema = object({
        name: string().min(2).required(),
        formYear: number().min(1).max(4).required(),
        unit: number().min(1).max(6).required(),
        teacherId: number().min(1).required(),
    }).required();

    const {
        control,
        handleSubmit,
    }: UseFormReturn<SubjectRequest> = useForm<SubjectRequest>({
        mode: "onTouched",
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
        shouldUnregister: false
    });

    return (
        <form onSubmit={handleSubmit(submitHandleCallback)}>
            <TextNumber
                required
                name="name"
                control={control}
                label="Subject Name"
            />
            <Select
                required
                name="teacherId"
                control={control}
                label="Teacher"
                options={teacherList.map((teacher: TeacherEntity) => ({
                    value: teacher.id,
                    label: teacher.name,
                }))}
            />
            <Select
                required
                name="department"
                control={control}
                label="Department"
                options={departments.map(department => ({
                    value: department,
                    label: texts.enum.department[department]
                }))}
            />
            <Select
                required
                name="classification"
                control={control}
                label="Classification"
                options={smallOptions.map(small => ({
                    value: small.name,
                    label: small.label
                }))}
            />
            <RadioGroup
                required
                name="formYear"
                control={control}
                label="Year Able"
                options={[1, 2, 3, 4].map(year => ({
                    value: year,
                    label: year
                }))}
            />
            <TextNumber
                required
                name="credit"
                control={control}
                label="Credit"
            />
            <Switch
                required
                name="require"
                control={control}
                label="Required"
            />

            <Button
                sx={{marginTop: 4}}
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                disabled={isLoading}>
                {isLoading ? <CircularProgress/> : submitButtonLabel || "Submit"}
            </Button>
        </form>
    )
}

const FormSkeleton = () => (
    <Box>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
    </Box>
)