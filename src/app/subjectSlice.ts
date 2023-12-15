import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {PageRequest} from "../model/commonModel";
import {teacherMapSelector} from "./teacherSlice";
import {SubjectEntity} from "../model/subjectModel";
import {useAppSelector} from "./hooks";

interface SubjectFilter {
    name: string;
    teacher: string;
}

// type ShowedColumns = {
//     [key in keyof SubjectEntity]-?: boolean;
// }

export interface SubjectState {
    // Table
    isLoading: boolean;
    list: SubjectEntity[];
    filter: SubjectFilter;
    pagination: PageRequest;
    // Form
    backdropOpen: boolean;
    editId?: number;
}

const initialState: SubjectState = {
    isLoading: false,
    list: [],
    filter: {
        name: "",
        teacher: "",
    },
    pagination: {
        limit: 10,
        page: 0,
    },
    backdropOpen: false,
    editId: undefined
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSubjectList: (state, action: PayloadAction<SubjectEntity[]>) => {
            state.list = action.payload;
        },
        setBackdropOpen: (state, action: PayloadAction<boolean>) => {
            state.backdropOpen = action.payload;
        },
        setFilter: (state, action: PayloadAction<SubjectFilter>) => {
            state.filter = action.payload;
        },
        setPagination: (state, action: PayloadAction<PageRequest>) => {
            state.pagination = action.payload;
        },
        setEditId: (state, action: PayloadAction<number | undefined>) => {
            state.editId = action.payload;
        },
    },
});

export const subjectListAfterFilterSelector = (root: RootState) => {
    const {name, teacher} = root.subject.filter;
    const {page, limit} = root.subject.pagination
    const teacherObj = teacherMapSelector(root);

    return root.subject.list
        .filter((subject) => {
            let valid = true;
            if (name && !subject.name.includes(name)) valid = false;
            if (
                teacher &&
                teacherObj[subject.teacherId as keyof typeof teacherObj] !== teacher
            )
                valid = false;
            return valid;
        })
        .slice(page * limit, (page + 1) * limit);
};

export function useSubjectSelector<T>(selector: (state: SubjectState) => T): T {
    return useAppSelector((root: RootState) => selector(root.subject));
}

export const subjectActions = subjectSlice.actions;
export const subjectReducer = subjectSlice.reducer;