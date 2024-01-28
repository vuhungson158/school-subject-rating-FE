import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import TeacherListFilter, {
    filterTeacherList,
    teacherFilterInitValue,
    TeacherListFilterModel
} from "./TeacherListFilter";
import TeacherListTable from "./TeacherListTable";
import TeacherListPaginator from "./TeacherListPaginator";
import {TeacherResponseModel} from "../../../model/teacherModel";
import {useEffect, useState} from "react";
import {UseState} from "../../../common/WrapperType";
import {useAsyncOnDidMount} from "../../../app/hooks";
import {ResponseWrapper} from "../../../model/commonModel";
import teacherApi from "../../../api/teacherApi";
import {UseFilterProps, useFilterProps} from "../../common/ListFilter";
import AddButton from "../../common/AddButton";

export const TeacherListPage = () => {
    const [originList, setOriginList]: UseState<TeacherResponseModel[]> = useState<TeacherResponseModel[]>([]);
    const [finalList, setFinalList]: UseState<TeacherResponseModel[]> = useState<TeacherResponseModel[]>(originList);
    const teacherFilterProps: UseFilterProps<TeacherListFilterModel> =
        useFilterProps({initValue: teacherFilterInitValue});

    useAsyncOnDidMount(async (): Promise<void> => {
        const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
        setOriginList(response.data);
    });

    useEffect(() => {
        const filteredList: TeacherResponseModel[] = filterTeacherList(teacherFilterProps.filter, originList);
        setFinalList((filteredList));
    }, [originList, teacherFilterProps.filter]);

    return (
        <Box>
            <TeacherListFilter {...teacherFilterProps}/>
            <AddButton/>
            <TeacherListTable/>
            <TeacherListPaginator/>
            <Outlet/>
        </Box>
    )
}