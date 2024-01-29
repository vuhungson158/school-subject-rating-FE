import {english as en} from "./english";
import {japan as ja} from "./japan";
import {vietnamese as vi} from "./vietnamese";
import {SubjectJoinTeacherModel, SubjectRequestModel, SubjectResponseModel} from "../model/subjectModel";
import {Department, Gender, Nationality, Status, TemplateLiteralSelect} from "../model/templateLiteral";
import {RoleKeys} from "../model/role";
import {BaseResponseModel} from "../model/commonModel";
import {Login, Request} from "../model/authModel";
import {TeacherResponseModel} from "../model/teacherModel";

export const texts = {
    en,
    ja,
    vi,
};

export const languageLabel: Record<Language, string> = {
    en: "English",
    ja: "日本語",
    vi: "Tiếng Việt",
};

export type MultiLanguageLabel<T> = { [key in keyof T]: string };
export type MultiLanguageEnum<T extends TemplateLiteralSelect> = { [key in T]: string };

export type TextFields = {
    layout: {
        sidebar: SidebarLabel;
        navigation: NavigationLabel;
        form: FormActionLabel;
        notFound: string;
    };
    model: {
        baseModel: MultiLanguageLabel<BaseResponseModel>;
        user: MultiLanguageLabel<Login & Request>;
        subject: MultiLanguageLabel<SubjectJoinTeacherModel & SubjectResponseModel & SubjectRequestModel>;
        // subjectRating: MultiLanguageLabel<Subject>;
        teacher: MultiLanguageLabel<TeacherResponseModel>;
        // teacherRating: TeacherRatingLabel;
        // comment: ;
    };
    common: CommonLabel;
    enum: {
        nationality: MultiLanguageEnum<Nationality>;
        department: MultiLanguageEnum<Department>;
        gender: MultiLanguageEnum<Gender>;
        status: MultiLanguageEnum<Status>;
        role: MultiLanguageEnum<RoleKeys>;
    };
    util: {
        dateFormat: [string, string, string];
    };
}

export interface SidebarLabel {
    navigation: string;
    setting: string;
    userInfo: string;
    darkMode: string;
    language: string;
}

export interface FormActionLabel {
    login: string;
    logout: string;
    resign: string;
    get: string;
    add: string;
    edit: string;
    delete: string;
}

export interface CommonLabel {
    rating: string;
    comment: string;
    star: string;
    total: string;
    gender: string;
    statistics: string;
    age: string;
    all: string;
}

export type SubjectLabel = {
    [key in keyof SubjectJoinTeacherModel]: string
};

export interface TeacherLabel {
    name: string;
    nationality: string;
    gender: string;
    dob: string;
}


export interface NavigationLabel {
    home: string;
    dashboard: string;
    subject: string;
    teacher: string;
    other: string;
    user: string;
    plan: string;
    condition: string;
}

export type Language = keyof typeof texts;
