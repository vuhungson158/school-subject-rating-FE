export { authReducer } from "../auth/slice";

export { commonReducer } from "../common/slice";

export { subjectReducer } from "../app/subjectSlice";
export { subjectCommentReducer } from "./subject/comment/slice";
export { subjectRatingReducer } from "./subject/rating/slice";
export { subjectConditionReducer } from "./subject/condition/slice";
export { subjectPlanReducer } from "./subject/plan/slice";

export { teacherReducer } from "./teacher/base/slice";
export { teacherCommentReducer } from "./teacher/comment/slice";
export { teacherRatingReducer } from "./teacher/rating/slice";
