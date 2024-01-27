import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import TeacherListFilter, {FilterCallback} from "./TeacherListFilter";
import TeacherListTable from "./TeacherListTable";
import TeacherListPaginator from "./TeacherListPaginator";
import {TeacherAddButton} from "./TeacherAddPopup";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {useAsyncOnDidMount} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import teacherApi from "../../../api/teacherApi";

export const TeacherListPage = () => {
    const [originList, setOriginList]: UseState<TeacherResponseModel[]> = useState<TeacherResponseModel[]>([]);
    const [finalList, setFinalList]: UseState<TeacherResponseModel[]> = useState<TeacherResponseModel[]>(originList);

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
        setOriginList(response.data);
    });

    const handleFilterChange = (filter: FilterCallback): void => {
        const filteredResult: TeacherResponseModel[] = filter(originList);
        setFinalList((filteredResult));
    }


    return (
        <Box>
            <TeacherListFilter onFilterChange={handleFilterChange}/>
            <TeacherAddButton/>
            <TeacherListTable/>
            <TeacherListPaginator/>
            <Outlet/>
        </Box>
    )
}