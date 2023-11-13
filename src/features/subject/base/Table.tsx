import {Box, Button, Switch,} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {TextFields} from "../../../language";
import {teacherMapSelector} from "../../teacher/base/slice";
import {Entity} from "./model";
import {subjectListAfterFilterSelector} from "./slice";
import {TableFrame} from "../../../widget/TableFrame";
import {CustomedLink} from "../../../widget";
import {PopMode} from "../../common/model";
import {Link} from "react-router-dom";
import {Permission, Role} from "../../auth/Role";
import {ButtonLink} from "../../../widget/ButtonLink";

const Table = () => {
    // const dispatch = useAppDispatch();
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);
    const role = useAppSelector((root: RootState) => root.auth.user?.role);
    const showedColumns = useAppSelector((root: RootState) => root.subject.showedColumns);
    const subjectList: Array<Entity> = useAppSelector(subjectListAfterFilterSelector);
    const teacherMap = useAppSelector(teacherMapSelector);
    const concatTexts = {...texts.model.subject.request, ...texts.model.base};

    const canEdit = role && Role[role].includes(Permission.SUBJECT_UPDATE);
    const canDelete = role && Role[role].includes(Permission.SUBJECT_DELETE);

    const header: string[] = Object.entries(showedColumns)
        .filter(([_, value]) => value)
        .map(([key]) => key as keyof Entity);

    const multiLanguageHeader: string[] = header.map(key => concatTexts[key as keyof Entity]);
    if (canEdit) multiLanguageHeader.push("#");
    if (canDelete) multiLanguageHeader.push("#");

    const body: any[][] = subjectList.map(subject => {
        const result = header.map(key => {
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
                            : (subject[key as keyof Entity]);
        })
        if (canEdit) {
            result.push(<ButtonLink to={`${PopMode.edit}/${subject.id}`} label="Edit" color="warning"/>);
        }
        if (canDelete) {
            result.push(<ButtonLink to={`${PopMode.delete}/${subject.id}`} label="Delete" color="error"/>);
        }
        return result;
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