import {toast} from "react-toastify";
import {AppThunk, Dispatch} from "../app/store";
import api from "../api/subjectApi";
import {SubjectRequest} from "../model/subjectModel";
import {subjectActions} from "../app/subjectSlice";

const subjectThunk = {
    fetchAll: (): AppThunk => async (dispatch: Dispatch) => {
        const response = await api.getAll();
        dispatch(subjectActions.setSubjectList(response.data));
    },
    add: (subject: SubjectRequest): AppThunk => async (dispatch: Dispatch) => {
        dispatch(subjectActions.setLoading(true));
        const response = await api.add(subject);
        dispatch(subjectActions.setLoading(false));
        if (response.code === 200) {
            toast.success(response.massage);
            dispatch(subjectThunk.fetchAll());
        } else {
            toast.warning("Failed");
            console.log(response);
        }
    },
    edit: (id: number, subject: SubjectRequest): AppThunk => async (dispatch: Dispatch) => {
        dispatch(subjectActions.setLoading(true));
        const response = await api.update(id, subject);
        dispatch(subjectActions.setLoading(false));
        if (response.code === 200) {
            toast.success(response.massage);
            dispatch(subjectThunk.fetchAll());
        } else {
            toast.warning("Failed");
            console.log(response);
        }
    },
    delete: (id: number): AppThunk => async (dispatch: Dispatch) => {
        dispatch(subjectActions.setLoading(true));
        const response = await api.delete(id);
        dispatch(subjectActions.setLoading(false));
        if (response.code === 200) {
            toast.success(response.massage);
            dispatch(subjectThunk.fetchAll());
            // dispatch(actions.setDeleteId(undefined));
        } else {
            toast.warning("Failed");
            console.log(response);
        }
    },
};

export default subjectThunk;
