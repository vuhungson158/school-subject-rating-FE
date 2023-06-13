import {yupResolver} from "@hookform/resolvers/yup";
import {Button, CircularProgress, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useForm, UseFormReturn} from "react-hook-form";
import {number, object, string} from "yup";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {RadioGroup, Select, TextNumber} from "../../../formFields";
import {Entity, Request} from "./model";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Entity as TeacherEntity} from "../../teacher/base/model";
import thunk from "./thunk";
import {departments} from "../../common/model";
import {TextFields} from "../../../language";

const Form = () => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const editId: number = useAppSelector((root: RootState) => root.subject.editId) as number;
    const editSubject: Entity | undefined = useAppSelector((root: RootState) => root.subject.list)
        .find((subject) => subject.id === editId);

    return (
        <Dialog
            open={true}
            onClose={() => navigate(-1)}>
            <DialogContent sx={{backgroundColor: "background.default"}}>
                <DialogTitle textAlign="center" fontSize={48}>
                    {editSubject ? "Edit " + editSubject.name : "Add a Subject"}
                </DialogTitle>
                <AddEditForm
                    subject={editSubject}
                    onSubmit={(subject: Request) =>
                        (editSubject ? dispatch(thunk.edit(editId, subject)) : dispatch(thunk.add(subject)))}
                />
            </DialogContent>
        </Dialog>
    );
};

interface FormProps {
    subject?: Request;
    onSubmit: (formValues: Request) => void;
}

const AddEditForm = ({
    subject,
    onSubmit
}: FormProps) => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const isLoading: boolean = useAppSelector((state: RootState) => state.subject.isLoading);
    const teacherList: TeacherEntity[] = useAppSelector((state: RootState) => state.teacher.list);

    const initValue: Request = subject || {
        name: "",
        formYear: 0,
        department: "ALL",
        credit: 0,
        teacherId: 0,
        classification: "ACCOUNTING",
        require: false,
    };

    const schema = object({
        name: string().min(2).required(),
        formYear: number().min(1).max(4).required(),
        unit: number().min(1).max(6).required(),
        teacherId: number().required(),
    }).required();

    const {
        control,
        handleSubmit
    }: UseFormReturn<Request> = useForm<Request>({
        defaultValues: initValue,
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextNumber name="name" control={control} label="Subject Name"/>
            <RadioGroup
                name="department"
                control={control}
                label="Department"
                options={departments.map(department => ({
                    value: department,
                    label: texts.enum.department[department]
                }))}
            />
            <TextNumber name="formYear" control={control} label="Year Able"/>
            <TextNumber name="unit" control={control} label="Unit"/>
            <Select
                name="teacherId"
                control={control}
                label="Teacher"
                options={teacherList.map((teacher: TeacherEntity) => ({
                    value: teacher.id as number,
                    label: teacher.name,
                }))}
            />

            <Button
                sx={{marginTop: 4}}
                fullWidth type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}>
                {isLoading ? <CircularProgress/> : "Submit"}
            </Button>
        </form>
    );
};

export default Form;
