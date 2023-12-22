import {TextFields} from "../../../language";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {useForm, UseFormReturn} from "react-hook-form";
import {SubjectRequest} from "../../../model/subjectModel";
import {yupResolver} from "@hookform/resolvers/yup";

export const TeacherForm = () => {
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    const {
        control,
        handleSubmit,
    }: UseFormReturn<SubjectRequest> = useForm<SubjectRequest>({
        mode: "onTouched",
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
        // shouldUnregister: false
    });
    return (
        <form onSubmit={handleSubmit(submitHandleCallback)}>

        </form>
    )
}