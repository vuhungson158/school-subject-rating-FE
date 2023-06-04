import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Department, Loading } from "../../common/model";
import { BigClass, MiddleClass } from "../base/classificationModel";
import { DepartmentGroup, Entity } from "./model";

interface PlanLoading extends Loading {
  one: boolean;
  group: boolean;
}

interface State {
  isLoading: PlanLoading;
  entity?: Entity;
  groupList: DepartmentGroup[];
  selectedDepartment: Department;
  checkedList: number[];
  disabledList: number[];
  status: {
    middle: { [key in MiddleClass]: number };
    big: { [key in BigClass]: number };
    all: number;
  };
}

const initialState: State = {
  isLoading: {
    list: false,
    cud: false,
    one: false,
    group: false,
  },
  entity: undefined,
  groupList: [],
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
    setGroupList: (state, action: PayloadAction<DepartmentGroup[]>) => {
      state.groupList = action.payload;
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
    generateDisabledList: (state) => {
      const disabledList: number[] = [];
      const checkedList: number[] = [];

      state.groupList.forEach((group) => {
        group.bigList.forEach((big) => {
          big.middleList.forEach((middle) => {
            middle.smallList.forEach((small) => {
              small.yearList.forEach((year) => {
                year.forEach((subject) => {
                  const { require, id } = subject.subjectEntity;
                  if (require) {
                    disabledList.push(id);
                    checkedList.push(id);
                  }
                });
              });
            });
          });
        });
      });
      state.disabledList = disabledList;
      state.checkedList = checkedList;
    },
    calculate: (state) => {
      const disabledList: number[] = [];

      state.groupList.forEach((group) => {
        group.bigList.forEach((big) => {
          big.middleList.forEach((middle) => {
            middle.smallList.forEach((small) => {
              small.yearList.forEach((year) => {
                year.forEach((subject) => {
                  const {
                    subjectEntity: { require, id },
                    conditionList,
                  } = subject;
                  if (
                    !state.disabledList.includes(id) &&
                    !conditionList.every((condition) => state.checkedList.includes(condition))
                  ) {
                    disabledList.push(id);
                  }
                });
              });
            });
          });
        });
      });
      // state.disabledList = state.disabledList.concat(disabledList);
    },
  },
});

export const actions = slice.actions;
export const subjectPlanReducer = slice.reducer;
