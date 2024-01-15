import {RouterPopUp, RouterPopUpContent, RouterPopUpTitle} from "../../../commonUI";
import {TeacherHookForm} from "./TeacherHookForm";
import {useAppDispatch, useAsyncOnDidMount} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import {TeacherJoinSubjectResponseModel, TeacherRequestModel} from "../../../model/teacherModel";
import teacherApi from "../../../api/teacherApi";
import {UseParams, UseState} from "../../../common/WrapperType";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {FormSkeleton} from "../../../commonUI/Skeleton";
import {toast} from "react-toastify";
import {teacherThunk} from "../../../thunk/teacherThunk";
import {AppDispatch} from "../../../app/store";

export const TeacherEditPopup = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const {id}: UseParams<{ id: string }> = useParams();
    const [teacher, setTeacher]: UseState<TeacherRequestModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherJoinSubjectResponseModel> = await teacherApi.findById(Number(id));
        setTeacher(response.data);
    });

    const submitHandle = async (teacher: TeacherRequestModel): Promise<void> => {
        await teacherApi.update(teacher, Number(id));
        toast.success("success");
        navigate(-2);
        dispatch(teacherThunk.refreshList())
    }

    return (
        <RouterPopUp>
            <RouterPopUpTitle> Edit </RouterPopUpTitle>
            <RouterPopUpContent>
                {teacher
                    ? <TeacherHookForm
                        defaultValues={teacher}
                        onSubmit={submitHandle}
                    />
                    : <FormSkeleton/>}
            </RouterPopUpContent>
        </RouterPopUp>
    )
}

