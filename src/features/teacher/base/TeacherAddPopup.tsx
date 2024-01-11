import {RouterPopUp, RouterPopUpContent, RouterPopUpTitle} from "../../../commonUI";
import {TeacherHookForm} from "./TeacherHookForm";
import {TeacherRequestModel} from "../../../model/teacherModel";
import type {AppDispatch} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {Util} from "../../../util";

export const TeacherAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();

    return (
        <RouterPopUp>
            <RouterPopUpTitle> Add </RouterPopUpTitle>
            <RouterPopUpContent>
                <TeacherHookForm
                    defaultValues={initTeacherRequestModel}
                    submitHandle={(teacher: TeacherRequestModel): void => {
                        console.log(teacher)
                    }}
                />
            </RouterPopUpContent>
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