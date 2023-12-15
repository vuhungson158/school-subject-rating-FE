import {Box, Button, Switch,} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {TextFields} from "../../../language";
import {teacherMapSelector} from "../../../app/teacherSlice";
import {SubjectEntity} from "../../../model/subjectModel";
import {subjectListAfterFilterSelector, SubjectState, useSubjectSelector} from "../../../app/subjectSlice";
import {TableFrame} from "./tableComponents/TableFrame";
import {CustomedLink} from "../../../widget";
import {PopMode} from "../../../model/commonModel";
import {Link} from "react-router-dom";

const Table = () => {
    // const dispatch = useAppDispatch();
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const filter = useSubjectSelector((state: SubjectState ) => state.filter)
    const subjectList: Array<SubjectEntity> = useAppSelector(subjectListAfterFilterSelector);
    const concatTexts = {...texts.model.subject.request, ...texts.model.base};

    const multiLanguageHeader: string[] = header.map(key => concatTexts[key as keyof SubjectEntity]);

    const body: any[][] = subjectList.map(subject => {
        return header.map(key => {
            return key === "name"
                ? <CustomedLink to={`${PopMode.detail}/${subject.id}`}>{subject.name}</CustomedLink>
                : key === "teacherId"
                    ? <CustomedLink to={`/teacher/${subject.teacherId}`}>
                        {teacherMap[subject.teacherId as keyof typeof teacherMap]}
                    </CustomedLink>
                    : key === "department"
                        ? texts.enum.department[subject.department]
                        : key === "require"
                            ? <Switch disabled checked={subject.require}/>
                            : (subject[key as keyof SubjectEntity]);
        })
    });

    return (
        <Box>
            <Link to={PopMode.add}>
                <Button variant="outlined" color="primary" fullWidth>
                    Add New
                </Button>
            </Link>
            <TableFrame header={multiLanguageHeader} body={body}/>
        </Box>
    );
};

export default Table;