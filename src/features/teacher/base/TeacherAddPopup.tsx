import {RouterPopUp, PopUpContent, PopUpTitle} from "../../../commonUI";
import {TeacherHookForm} from "./TeacherHookForm";
import {TeacherRequestModel} from "../../../model/teacherModel";
import {Util} from "../../../util";
import teacherApi from "../../../api/teacherApi";
import {toast} from "react-toastify";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {AppDispatch} from "../../../app/store";
import {teacherThunk} from "../../../thunk/teacherThunk";
import {RouterLinkButton} from "../../../commonUI/Button";
import {PopMode} from "../../../constant/featureLabel";

export const TeacherAddButton = () => {
    return (
        <RouterLinkButton label="Add New" to={PopMode.ADD} fullWidth/>
    )
}

export const TeacherAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const submitHandle = async (teacher: TeacherRequestModel): Promise<void> => {
        await teacherApi.create(teacher);
        toast.success("success");
        navigate(-1);
        dispatch(teacherThunk.refreshList())
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