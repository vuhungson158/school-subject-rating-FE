import {MiddleClass} from "../model/classificationModel";

export const enum Feature {
    AUTH = "auth",
    SETTING = "setting",
    DASHBOARD = "dashboard",
    COMMON = "common",
    TEACHER = "teacher",
    SUBJECT = "subject",
}

export const enum PopMode {
    DETAIL = "detail",
    ADD = "add",
    EDIT = "edit",
    RATING = "rating",
    COMMENT = "comment",
    DELETE = "delete"
}

export const classificationColor: { [key in MiddleClass]: string } = {
    GENERAL_EDUCATION: "#EAF7FF",
    LANGUAGE: "#E6FFCD",
    CAREER_DEVELOPMENT: "#FFE7FE",
    BASIC_SPECIAL_TRAINING: "#FFFFFF",
    SPECIALIZED_BASIS: "#EAF7FF",
    SPECIALIZED_PRACTICAL: "#FFE7FE",
    SPECIALIZED_UPGRADE: "#E6FFCD",
    SEMINAR: "#FFFFFF",
    SPECIALIZED_SPECIAL_TRAINING: "#FFFFFF",
};

export const enum Back {
    ONE_PAGE = -1,
    TWO_PAGE = -2,
}