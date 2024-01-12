import {RouterPopUp, RouterPopUpContent, RouterPopUpTitle} from "../../../commonUI";
import {TeacherHookForm} from "./TeacherHookForm";
import {TeacherRequestModel} from "../../../model/teacherModel";
import {Util} from "../../../util";
import teacherApi from "../../../api/teacherApi";
import {toast} from "react-toastify";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {PopMode} from "../../../model/commonModel";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {AppDispatch} from "../../../app/store";
import {teacherThunk} from "../../../thunk/teacherThunk";

export const TeacherAddButton = () => {
    return (
        <Link to={PopMode.add}>
            <Button variant="outlined" color="primary" fullWidth>
                Add New
            </Button>
        </Link>
    )
}

export const TeacherAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const submitHandle = async (teacher: TeacherRequestModel): Promise<void> => {
        await teacherApi.create(teacher);
        toast.success("success");
        navigate(-1);
        refreshTeacherList();
    }

    const refreshTeacherList = (): void => {
        dispatch(teacherThunk.findAll())
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