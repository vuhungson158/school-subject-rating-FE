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
import subjectApi from "../../../api/subjectApi";
import {ResponseWrapper} from "../../../model/commonModel";
import {useState} from "react";
import {SubjectJoinTeacherModel} from "../../../model/subjectModel";
import {Back, Feature, PopMode} from "../../../common/enums";
import {AppDispatch} from "../../../app/store";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {triggerReduxActions} from "../../../app/triggerSlice";

export const SubjectDetailPopup = () => {
    return (
        <RouterPopUp>
            <PopUpTitle> Detail </PopUpTitle>
            <PopUpContent>
                <RedirectButtons/>
                <SubjectInformation/>
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
        await subjectApi.delete(id);
        navigate(Back.ONE_PAGE);
        dispatch(triggerReduxActions.refreshList("subjectList"))
    }
    return (
        <DeletePopUp onAccept={handleAccept}>
            Are you sure ?
        </DeletePopUp>
    )
}

const SubjectInformation = () => {
    const {id}: UseParams<{ id: string }> = useParams();
    const [subject, setSubject]: UseState<SubjectJoinTeacherModel | undefined> = useState();

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<SubjectJoinTeacherModel> = await subjectApi.findById(Number(id));
        setSubject(response.data);
    });

    return (
        <Box>
            <InformationHolder label="Subject Name" value={subject?.name}/>
            {subject && <TeacherLinks teacher={subject.teacher}/>}
            <InformationHolder label="Subject Credit" value={subject?.credit}/>
            <InformationHolder label="Subject Registrable Year" value={subject?.registrableYear}/>
            <InformationHolder label="Subject Department" value={subject?.department}/>
            <InformationHolder label="Subject Classification" value={subject?.classification}/>
            <InformationHolder label="Is Require" value={subject?.require ? "Yes" : "No"}/>
            <InformationHolder label="Subject Semester" value={subject?.semester}/>
            <InformationHolder label="Subject Schedule" value={subject?.schedule}/>
        </Box>
    )
}

const TeacherLinks = ({teacher}: { teacher: TeacherResponseModel }) => {
    return (
        <LinkList label="担当先生">
            {[
                <CustomRouterLink key={teacher.id} to={`/${Feature.TEACHER}/${teacher.id}/${PopMode.DETAIL}`}>
                    {teacher.name}
                </CustomRouterLink>
            ]}
        </LinkList>
    )
}

