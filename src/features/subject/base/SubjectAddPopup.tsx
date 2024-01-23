import {PopMode} from "../../../common/enums";
import {RouterLinkButton} from "../../../commonUI/Button";
import {PopUpContent, PopUpTitle, RouterPopUp} from "../../../commonUI";
import {AppDispatch} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {SubjectRequestModel, SubjectResponseModel} from "../../../model/subjectModel";
import {ResponseWrapper} from "../../../model/commonModel";
import subjectApi from "../../../api/subjectApi";
import {toast} from "react-toastify";
import {SubjectHookForm} from "./SubjectHookForm";
import {subjectReduxActions} from "../../../app/subjectSlice";

export const SubjectAddButton = () => {
    return <RouterLinkButton label="Add New" to={PopMode.ADD} fullWidth/>
}

export const SubjectAddPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const submitHandle = async (subject: SubjectRequestModel): Promise<void> => {
        const response: ResponseWrapper<SubjectResponseModel> = await subjectApi.create(subject);
        toast.success("success");
        navigate(`../${response.data.id}/${PopMode.DETAIL}`);
        dispatch(subjectReduxActions.refreshList())
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
    department: "ALL",
    classification: "BUSINESS",
    require: true,
    semester: "",
    schedule: "",
    teacherId: "",
};