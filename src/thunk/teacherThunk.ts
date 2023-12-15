// import {AppThunk, Dispatch} from "../app/store";
// import teacherApi from "../api/teacherApi";
// import {TeacherRequestModel, TeacherResponseModel} from "../model/teacherModel";
// import {teacherReduxActions} from "../app/teacherSlice";
// import {ResponseWrapper} from "../model/commonModel";
//
// interface TeacherThunk {
//     fetchAll: () => AppThunk<boolean>;
//     add: (teacher: TeacherRequestModel) => AppThunk;
// }
//
// const teacherThunk: TeacherThunk = {
//     fetchAll: (): AppThunk<boolean> => async (dispatch: Dispatch): Promise<boolean> => {
//         const response: ResponseWrapper<TeacherResponseModel[]> = await teacherApi.getAll();
//         dispatch(teacherReduxActions.setTeacherList(response.data));
//     },
//     add: (teacher: TeacherRequestModel): AppThunk => async (dispatch: Dispatch): Promise<void> => {
//         await teacherApi.add(teacher);
//         dispatch(teacherThunk.fetchAll());
//     },
// };
// export default teacherThunk;