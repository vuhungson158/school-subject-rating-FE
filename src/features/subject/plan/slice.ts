import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Department, Loading } from "../../../common/model";
import { BigClass, MiddleClass } from "../../../model/classificationModel";
import { BigList, Entity } from "./model";

interface PlanLoading extends Loading {
  one: boolean;
  group: boolean;
}

interface Status {
  middle: { [key in MiddleClass]: number };
  big: { [key in BigClass]: number };
  all: number;
}

interface State {
  isLoading: PlanLoading;
  entity?: Entity;
  bigList: BigList;
  selectedDepartment: Department;
  checkedList: number[];
  disabledList: number[];
  status: Status;
}

const initialState: State = {
  isLoading: {
    list: false,
    cud: false,
    one: false,
    group: false,
  },
  entity: undefined,
  bigList: new BigList([]),
  selectedDepartment: "NETWORK",
  checkedList: [],
  disabledList: [],
  status: {
    middle: {
      GENERAL_EDUCATION: 0,
      LANGUAGE: 0,
      CAREER_DEVELOPMENT: 0,
      BASIC_SPECIAL_TRAINING: 0,
      SPECIALIZED_BASIS: 0,
      SPECIALIZED_PRACTICAL: 0,
      SPECIALIZED_UPGRADE: 0,
      SEMINAR: 0,
      SPECIALIZED_SPECIAL_TRAINING: 0,
    },
    big: {
      BASIC_GENERAL: 0,
      SPECIALIZED_EDUCATION: 0,
    },
    all: 0,
  },
};

const slice = createSlice({
  name: "subjectPlan",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<PlanLoading>) => {
      state.isLoading = action.payload;
    },
    setEntity: (state, action: PayloadAction<Entity>) => {
      state.entity = action.payload;
    },
    initBigList: (state, action: PayloadAction<BigList>) => {
      state.bigList = action.payload;

      const checkedList: number[] = [];

      state.bigList.loop(({ subject }) => {
        const { require, id } = subject.subjectEntity;
        if (require) {
          checkedList.push(id);
        }
      });
      state.disabledList = state.bigList.requireList;
      state.checkedList = checkedList;
    },
    tonggleId: (state, action: PayloadAction<number>) => {
      const { checkedList } = state;
      const { payload } = action;

      if (checkedList.includes(payload)) {
        state.checkedList = checkedList.filter((id) => id !== action.payload);
      } else {
        checkedList.push(action.payload);
      }
    },
    setDepartment: (state, action: PayloadAction<Department>) => {
      state.selectedDepartment = action.payload;
    },
    calculate: (state) => {
      const disabledList: number[] = [];
      // const status: Status = initialState.status;

      state.bigList.loop(({ subject }) => {
        const {
          subjectEntity: { id },
          conditionList,
        } = subject;
        if (
          !state.disabledList.includes(id) &&
          !conditionList.every((condition) => state.checkedList.includes(condition))
        ) {
          disabledList.push(id);
        }
      });
    },
  },
});

export const actions = slice.actions;
export const subjectPlanReducer = slice.reducer;
