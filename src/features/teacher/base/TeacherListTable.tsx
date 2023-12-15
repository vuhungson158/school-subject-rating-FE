import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {type AppDispatch, RootState} from "../../../app/store";
import {TextFields} from "../../../language";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {PageRequest} from "../../../model/commonModel";
import {TableBody, TableHeader, TableSkeleton} from "../../../commonUI/Table";
import {useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {TeacherListFilter} from "../../../app/teacherSlice";

const TeacherListTable = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const texts: TextFields = useAppSelector((root: RootState) => root.common.texts);

    const [isLoading, setLoading]: UseState<boolean> = useState(false);
    const teacherList: TeacherResponseModel[] = useAppSelector((root: RootState) => root.teacher.list);
    const pagination: PageRequest = useAppSelector((root: RootState) => root.teacher.pagination);
    const filter: TeacherListFilter = useAppSelector((root: RootState) => root.teacher.filter);

    const headers: Array<keyof TeacherResponseModel> = getHeaders();

    return (
        <Box>
            <TableHeader headers={headers}/>
            {isLoading
                ? <TableSkeleton headers={headers}/>
                : <TableBody data={teacherList}/>}
        </Box>
    );
};

const getHeaders = (): Array<keyof TeacherResponseModel> => {
    return ["name", "gender", "nationality", "dob"]
}

const filter = (teacherList: TeacherResponseModel[],) => {
    return
}

export default TeacherListTable;