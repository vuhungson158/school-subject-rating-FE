import {RouterPopUp, RouterPopUpContent, RouterPopUpTitle} from "../../../commonUI";
import {TeacherHookForm} from "./TeacherHookForm";
import {TeacherRequestModel} from "../../../model/teacherModel";
import type {AppDispatch} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {Util} from "../../../util";
import teacherApi from "../../../api/teacherApi";
import {toast} from "react-toastify";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {nanoid} from "@reduxjs/toolkit";

export const TeacherAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const submitHandle = async (teacher: TeacherRequestModel): Promise<void> => {
        await teacherApi.create(teacher);
        toast.success("success");
        navigate("..", {state: nanoid()});
    }

    return (
        <RouterPopUp>
            <RouterPopUpTitle> Add </RouterPopUpTitle>
            <RouterPopUpContent>
                <TeacherHookForm
                    defaultValues={initTeacherRequestModel}
                    submitHandle={submitHandle}
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