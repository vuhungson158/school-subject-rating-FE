import {PopMode} from "../../../common/enums";
import {PopUpContent, PopUpTitle, RouterPopUp} from "../../../ui";
import {AppDispatch} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {SubjectRequestModel} from "../../../model/subjectModel";
import {ResponseWrapper} from "../../../model/commonModel";
import subjectApi from "../../../api/subjectApi";
import {toast} from "react-toastify";
import {SubjectHookForm} from "./SubjectHookForm";
import {triggerReduxActions} from "../../../app/triggerSlice";

export const SubjectAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const submitHandle = async (subject: SubjectRequestModel): Promise<void> => {
        const response: ResponseWrapper<number> = await subjectApi.create(subject);
        toast.success("success");
        navigate(`../${response.data}/${PopMode.DETAIL}`);
        dispatch(triggerReduxActions.refreshList("subjectList"));
    }

    return (
        <RouterPopUp>
            <PopUpTitle> Add </PopUpTitle>
            <PopUpContent>
                <SubjectHookForm
                    defaultValues={initSubjectRequestModel}
                    onSubmit={submitHandle}
                />
            </PopUpContent>
        </RouterPopUp>
    )
}

const initSubjectRequestModel: SubjectRequestModel = {
    name: "",
    credit: 0,
    registrableYear: 0,
    department: "BASIC",
    classification: "BUSINESS",
    require: true,
    semester: "",
    schedule: "",
    teacherId: undefined,
};