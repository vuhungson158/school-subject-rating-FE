import {FormSkeleton, PopUpContent, PopUpTitle, RouterPopUp} from "../../../ui";
import {SubjectHookForm} from "./SubjectHookForm";
import {useAppDispatch, useAsyncOnDidMount} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import {SubjectJoinTeacherModel, SubjectRequestModel} from "../../../model/subjectModel";
import subjectApi from "../../../api/subjectApi";
import {UseParams, UseState} from "../../../common/WrapperType";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import {PopMode} from "../../../common/enums";
import {AppDispatch} from "../../../app/store";
import {triggerReduxActions} from "../../../app/triggerSlice";

export const SubjectEditPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const {id}: UseParams<{ id: string }> = useParams();
    const [subject, setSubject]: UseState<SubjectRequestModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<SubjectJoinTeacherModel> = await subjectApi.findById(Number(id));
        setSubject({...response.data, teacherId: response.data.teacher.id});
    });

    const submitHandle = async (subjectRequest: SubjectRequestModel): Promise<void> => {
        const response: ResponseWrapper<number> = await subjectApi.update(subjectRequest, Number(id));
        toast.success("success");
        navigate(`../${response.data}/${PopMode.DETAIL}`);
        dispatch(triggerReduxActions.refreshList("subjectList"));
    }

    return (
        <RouterPopUp>
            <PopUpTitle> Edit </PopUpTitle>
            <PopUpContent>
                {subject
                    ? <SubjectHookForm
                        defaultValues={subject}
                        onSubmit={submitHandle}
                    />
                    : <FormSkeleton/>}
            </PopUpContent>
        </RouterPopUp>
    )
}