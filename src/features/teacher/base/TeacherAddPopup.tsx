import {DialogTitle} from "@mui/material";
import {RouterPopUp} from "../../../commonUI";
import {TeacherHookForm} from "./TeacherHookForm";
import {TeacherRequestModel} from "../../../model/teacherModel";
import type {AppDispatch} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {Util} from "../../../util";

export const TeacherAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();

    return (
        <RouterPopUp>
            <DialogTitle textAlign="center" fontSize={48}>
                Add
            </DialogTitle>
            <TeacherHookForm
                defaultValues={initTeacherRequestModel}
                submitHandle={(teacher: TeacherRequestModel): void => {
                    console.log(teacher)
                }}
            />
        </RouterPopUp>
    )
}

const initTeacherRequestModel: TeacherRequestModel = {
    name: "",
    furigana: "",
    gender: "MALE",
    nationality: "",
    dob: Util.initDate(),
};