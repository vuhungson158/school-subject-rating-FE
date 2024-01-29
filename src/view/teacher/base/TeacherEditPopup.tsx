import {FormSkeleton, PopUpContent, PopUpTitle, RouterPopUp} from "../../../ui";
import {TeacherHookForm} from "./TeacherHookForm";
import {useAppDispatch, useAsyncOnDidMount} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import {TeacherJoinSubjectResponseModel, TeacherRequestModel} from "../../../model/teacherModel";
import teacherApi from "../../../api/teacherApi";
import {UseParams, UseState} from "../../../common/WrapperType";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import {Feature, PopMode} from "../../../common/enums";
import {AppDispatch} from "../../../app/store";
import {triggerReduxActions} from "../../../app/triggerSlice";

export const TeacherEditPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const {id}: UseParams<{ id: string }> = useParams();
    const [teacher, setTeacher]: UseState<TeacherRequestModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherJoinSubjectResponseModel> = await teacherApi.findById(Number(id));
        setTeacher(response.data);
    });

    const submitHandle = async (teacherRequest: TeacherRequestModel): Promise<void> => {
        const response: ResponseWrapper<number> = await teacherApi.update(teacherRequest, Number(id));
        toast.success("success");
        navigate(`../${response.data}/${PopMode.DETAIL}`);
        dispatch(triggerReduxActions.refreshList(Feature.TEACHER));
    }

    return (
        <RouterPopUp>
            <PopUpTitle> Edit </PopUpTitle>
            <PopUpContent>
                {teacher
                    ? <TeacherHookForm
                        defaultValues={teacher}
                        onSubmit={submitHandle}
                    />
                    : <FormSkeleton/>}
            </PopUpContent>
        </RouterPopUp>
    )
}