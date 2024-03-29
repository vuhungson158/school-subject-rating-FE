import {
    CustomRouterLink,
    DeletePopUp,
    InformationHolder,
    JustifyBox,
    LinkList,
    PopUpContent,
    PopUpTitle,
    RouterLinkButton,
    RouterPopUp
} from "../../../ui";
import {Box} from "@mui/material";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {UseParams, UseState} from "../../../common/WrapperType";
import {useAppDispatch, useAsyncOnDidMount} from "../../../app/hooks";
import teacherApi from "../../../api/teacherApi";
import {ResponseWrapper} from "../../../model/commonModel";
import {TeacherJoinSubjectModel} from "../../../model/teacherModel";
import {useState} from "react";
import {SubjectResponseModel} from "../../../model/subjectModel";
import {Back, Feature, PopMode} from "../../../common/enums";
import {AppDispatch} from "../../../app/store";
import {triggerReduxActions} from "../../../app/triggerSlice";

export const TeacherDetailPopup = () => {
    return (
        <RouterPopUp>
            <PopUpTitle> Detail </PopUpTitle>
            <PopUpContent>
                <RedirectButtons/>
                <TeacherInformation/>
            </PopUpContent>
        </RouterPopUp>
    )
}

const RedirectButtons = () => {
    const {id}: UseParams<{ id: string }> = useParams();

    return (
        <JustifyBox>
            <RouterLinkButton label="Edit" to={`../${id}/${PopMode.EDIT}`} color="warning"/>
            <DeleteButton id={Number(id)}/>
        </JustifyBox>
    )
}

const DeleteButton = ({id}: { id: number }) => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleAccept = async (): Promise<void> => {
        await teacherApi.delete(id);
        navigate(Back.ONE_PAGE);
        dispatch(triggerReduxActions.refreshList("teacherList"));
    }

    return (
        <DeletePopUp onAccept={handleAccept}>
            Are you sure ?
        </DeletePopUp>
    )
}

const TeacherInformation = () => {
    const {id}: UseParams<{ id: string }> = useParams();
    const [teacher, setTeacher]: UseState<TeacherJoinSubjectModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherJoinSubjectModel> = await teacherApi.findById(Number(id));
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

