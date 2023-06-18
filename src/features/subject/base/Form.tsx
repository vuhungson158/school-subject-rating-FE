import {yupResolver} from "@hookform/resolvers/yup";
import {Button, CircularProgress, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useForm, UseFormReturn} from "react-hook-form";
import {number, object, string} from "yup";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {RadioGroup, Select, Switch, TextNumber} from "../../../formFields";
import {Entity, initRequest, Request} from "./model";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {Entity as TeacherEntity} from "../../teacher/base/model";
import thunk from "./thunk";
import {departments, FormMode} from "../../common/model";
import {TextFields} from "../../../language";
import api from "./api";

const Form = () => {
    const {
        mode,
        id
    } = useParams<{
        mode: FormMode,
        id: string
    }>();

    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const editId: number = useAppSelector((root: RootState) => root.subject.editId) as number;
    const editSubject: Entity | undefined = useAppSelector((root: RootState) => root.subject.list)
        .find((subject) => subject.id === editId);
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const isLoading: boolean = useAppSelector((state: RootState) => state.subject.isLoading);
    const teacherList: TeacherEntity[] = useAppSelector((state: RootState) => state.teacher.list);
    const smallOptions = useAppSelector((state: RootState) => state.subjectPlan.bigList.smalls);

    const initValue = initRequest;

    const schema = object({
        name: string().min(2).required(),
        formYear: number().min(1).max(4).required(),
        unit: number().min(1).max(6).required(),
        teacherId: number().min(1).required(),
    }).required();

    // const asyncValue = (id && (mode === "edit" || mode === "detail"))
    //     ? async () => api.getById(Number(id)).then(r => r.data)
    //     : async () => initValue;

    const {
        control,
        handleSubmit,
    }: UseFormReturn<Request> = useForm<Request>({
        mode: "onTouched",
        defaultValues: (id && (mode === "edit" || mode === "detail"))
            ? async () => api.getById(Number(id)).then(r => r.data)
            : initValue,
        resolver: yupResolver(schema),
    });

    return (
        <Dialog
            open={true}
            onClose={() => navigate(-1)}
        >
            <DialogContent sx={{
                backgroundColor: "background.default"
            }}>
                <DialogTitle textAlign="center" fontSize={48}>
                    {editSubject ? "Edit " + editSubject.name : "Add a Subject"}
                </DialogTitle>

                <form onSubmit={handleSubmit((subject: Request) =>
                    (editSubject ? dispatch(thunk.edit(editId, subject)) : dispatch(thunk.add(subject))))}>
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
                        fullWidth type="submit"
                        variant="outlined"
                        color="primary"
                        disabled={isLoading}>
                        {isLoading ? <CircularProgress/> : "Submit"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Form;