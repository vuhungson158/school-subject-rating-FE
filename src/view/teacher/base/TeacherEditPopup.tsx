import {FormSkeleton, PopUpContent, PopUpTitle, RouterPopUp} from "../../../ui";
import {TeacherHookForm} from "./TeacherHookForm";
import {useAsyncOnDidMount} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import {TeacherJoinSubjectResponseModel, TeacherRequestModel, TeacherResponseModel} from "../../../model/teacherModel";
import teacherApi from "../../../api/teacherApi";
import {UseParams, UseState} from "../../../common/WrapperType";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import {PopMode} from "../../../common/enums";

export const TeacherEditPopup = () => {
    const navigate: NavigateFunction = useNavigate();
    const {id}: UseParams<{ id: string }> = useParams();
    const [teacher, setTeacher]: UseState<TeacherRequestModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherJoinSubjectResponseModel> = await teacherApi.findById(Number(id));
        setTeacher(response.data);
    });

    const submitHandle = async (teacher: TeacherRequestModel): Promise<void> => {
        const response: ResponseWrapper<TeacherResponseModel> = await teacherApi.update(teacher, Number(id));
        toast.success("success");
        navigate(`../${response.data.id}/${PopMode.DETAIL}`);
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