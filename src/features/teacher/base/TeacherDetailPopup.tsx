import {RouterPopUp, RouterPopUpContent, RouterPopUpTitle} from "../../../commonUI";
import {Box} from "@mui/material";
import {InformationHolder, JustifyBox} from "../../../commonUI/Other";
import {useParams} from "react-router-dom";
import {UseParams, UseState} from "../../../common/WrapperType";
import {useAsyncOnDidMount} from "../../../app/hooks";
import teacherApi from "../../../api/teacherApi";
import {ResponseWrapper} from "../../../model/commonModel";
import {TeacherJoinSubjectResponseModel} from "../../../model/teacherModel";
import {useState} from "react";
import {RouterLinkButton} from "../../../commonUI/Button";
import {SubjectResponseModel} from "../../../model/subjectModel";
import {CustomRouterLink, LinkList} from "../../../commonUI/Link";
import {Feature, PopMode} from "../../../constant/featureLabel";

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
            <RouterLinkButton label="Edit" to={`../${id}/${PopMode.EDIT}`} color="warning"/>
            <RouterLinkButton label="Delete" to={`../${id}/${PopMode.DELETE}`} color="error"/>
        </JustifyBox>
    )
}

const TeacherInformation = () => {
    const {id}: UseParams<{ id: string }> = useParams();
    const [teacher, setTeacher]: UseState<TeacherJoinSubjectResponseModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherJoinSubjectResponseModel> = await teacherApi.findById(Number(id));
        setTeacher(response.data);
    });

    return (
        <Box>
            <InformationHolder label="Teacher Name" value={`${teacher?.name} (${teacher?.furigana})`}/>
            {teacher && <SubjectLinks subjects={teacher?.subjects}/>}
            <InformationHolder label="Teacher Gender" value={teacher?.gender}/>
            <InformationHolder label="Teacher Nationality" value={teacher?.nationality}/>
            <InformationHolder label="Teacher Age" value={teacher?.age}/>
        </Box>
    )
}

const SubjectLinks = ({subjects}: { subjects: SubjectResponseModel[] }) => {

    return (
        <LinkList label="担当科目">
            {subjects.map((subject: SubjectResponseModel) => (
                <CustomRouterLink key={subject.id} to={`/${Feature.SUBJECT}/${subject.id}/${PopMode.DETAIL}`}>
                    {subject.name}
                </CustomRouterLink>
            ))}
        </LinkList>
    )
}

