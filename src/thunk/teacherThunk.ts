import {AppThunk, ThunkActionDispatch} from "../app/store";
import teacherApi from "../api/teacherApi";
import {ResponseWrapper} from "../model/commonModel";
import {TeacherResponseModel} from "../model/teacherModel";
import {teacherReduxActions} from "../app/teacherSlice";

export const teacherThunk = {
    refreshList: (): AppThunk => async (dispatch: ThunkActionDispatch): Promise<void> => {
        dispatch(teacherReduxActions.setListFetching(true));
        const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.findAll();
        dispatch(teacherReduxActions.setTeacherList(response.data));
        dispatch(teacherReduxActions.setListFetching(false));
    },
};