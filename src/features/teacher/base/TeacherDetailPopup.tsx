import {RouterPopUp, RouterPopUpContent, RouterPopUpTitle} from "../../../commonUI";
import {Box} from "@mui/material";
import {InformationHolder} from "../../../commonUI/Other";
import {useParams} from "react-router-dom";
import {UseParams, UseState} from "../../../common/WrapperType";
import {useAsync} from "../../../app/hooks";
import teacherApi from "../../../api/teacherApi";
import {ResponseWrapper} from "../../../model/commonModel";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {useState} from "react";

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
    return (
        <Box>

        </Box>
    )
}

const TeacherInformation = () => {
    const {id}: UseParams<{ id: string }> = useParams();
    const [teacher, setTeacher]: UseState<TeacherResponseModel | undefined> = useState();

    useAsync(async (): Promise<void> => {
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