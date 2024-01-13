import {RouterPopUp, RouterPopUpContent, RouterPopUpTitle} from "../../../commonUI";
import {Box} from "@mui/material";
import {InformationHolder, JustifyBox} from "../../../commonUI/Other";
import {useParams} from "react-router-dom";
import {UseParams, UseState} from "../../../common/WrapperType";
import {useAsyncOnDidMount} from "../../../app/hooks";
import teacherApi from "../../../api/teacherApi";
import {PopMode, ResponseWrapper} from "../../../model/commonModel";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {useState} from "react";
import {RouterLinkButton} from "../../../commonUI/Button";

export const TeacherDetailPopup = () => {
    return (
        <RouterPopUp>
            <RouterPopUpTitle> Detail </RouterPopUpTitle>
            <RouterPopUpContent>
                <RedirectButtons/>
                <TeacherInformation/>
            </RouterPopUpContent>
        </RouterPopUp>
    )
}

const RedirectButtons = () => {
    const {id}: UseParams<{ id: string }> = useParams();

    return (
        <JustifyBox>
            <RouterLinkButton label="Edit" to={`../${id}/${PopMode.edit}`} color="warning"/>
            <RouterLinkButton label="Delete" to={`../${id}/${PopMode.delete}`} color="error"/>
        </JustifyBox>
    )
}

const TeacherInformation = () => {
    const {id}: UseParams<{ id: string }> = useParams();
    const [teacher, setTeacher]: UseState<TeacherResponseModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherResponseModel> = await teacherApi.findById(Number(id));
        setTeacher(response.data);
    });

    return (
        <Box>
            <InformationHolder label="Teacher Name" value={`${teacher?.name} (${teacher?.furigana})`}/>
            <InformationHolder label="Teacher Gender" value={teacher?.gender}/>
            <InformationHolder label="Teacher Nationality" value={teacher?.nationality}/>
            <InformationHolder label="Teacher Age" value={teacher?.age}/>
        </Box>
    )
}