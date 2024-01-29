import {PopUpContent, PopUpTitle, RouterPopUp} from "../../../ui";
import {TeacherHookForm} from "./TeacherHookForm";
import {TeacherRequestModel} from "../../../model/teacherModel";
import {Util} from "../../../util";
import teacherApi from "../../../api/teacherApi";
import {toast} from "react-toastify";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Feature, PopMode} from "../../../common/enums";
import {ResponseWrapper} from "../../../model/commonModel";
import {AppDispatch} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {triggerReduxActions} from "../../../app/triggerSlice";

export const TeacherAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const submitHandle = async (teacher: TeacherRequestModel): Promise<void> => {
        const response: ResponseWrapper<number> = await teacherApi.create(teacher);
        toast.success("success");
        navigate(`../${response.data}/${PopMode.DETAIL}`);
        dispatch(triggerReduxActions.refreshList(Feature.TEACHER));
    }

    return (
        <RouterPopUp>
            <PopUpTitle> Add </PopUpTitle>
            <PopUpContent>
                <TeacherHookForm
                    defaultValues={initTeacherRequestModel}
                    onSubmit={submitHandle}
                />
            </PopUpContent>
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