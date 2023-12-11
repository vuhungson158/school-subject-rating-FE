import {Box, Button, Switch,} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {TextFields} from "../../../language";
import {teacherMapSelector} from "../../teacher/base/slice";
import {SubjectEntity} from "./subjectModel";
import {subjectListAfterFilterSelector, SubjectState, useSubjectSelector} from "./subjectSlice";
import {TableFrame} from "./tableComponents/TableFrame";
import {CustomedLink} from "../../../widget";
import {PopMode} from "../../../common/model";
import {Link} from "react-router-dom";

const Table = () => {
    // const dispatch = useAppDispatch();
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const showedColumns = useAppSelector((root: RootState) => root.subject.showedColumns);
    const filter = useSubjectSelector((state: SubjectState ) => state.filter)
    const subjectList: Array<SubjectEntity> = useAppSelector(subjectListAfterFilterSelector);
    const teacherMap = useAppSelector(teacherMapSelector);
    const concatTexts = {...texts.model.subject.request, ...texts.model.base};


    const header: string[] = Object.entries(showedColumns)
        .filter(([_, value]) => value)
        .map(([key]) => key as keyof SubjectEntity);

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

export {Filter} from "./tableComponents/Filter";
export {Paginator} from "./tableComponents/Paginator";
export {ShowColumnController} from "./tableComponents/ShowColumnController";
export default Table;