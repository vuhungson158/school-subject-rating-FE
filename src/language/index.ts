import {english as en} from "./english";
import {japan as ja} from "./japan";
import {vietnamese as vi} from "./vietnamese";
import {SubjectRequest} from "../model/subjectModel";

export const texts = {
  en,
  ja,
  vi,
};

export const languageLabel = {
  en: "English",
  ja: "日本語",
  vi: "Tiếng Việt",
};

export interface TextFields {
  layout: {
    sidebar: {
      navigation: string;
      setting: string;
      userInfo: string;
      darkMode: string;
      language: string;
    };
    navigation: NavigationLabel;
    form: {
      login: string;
      logout: string;
      resign: string;
      get: string;
      add: string;
      edit: string;
      delete: string;
    };
    notFound: string;
  };
  model: {
    base: {
      id: string;
      createdAt: string;
      updatedAt: string;
      disable: string;
    };
    user: {
      login: {
        username: string;
        password: string;
      };
      request: {
        email: string;
        password: string;
        displayName: string;
        role: string;
      };
    };
    subject: {
      request: { [key in keyof SubjectRequest]: string };
      rating: SubjectRatingLabel;
    };
    teacher: {
      request: TeacherRequestLabel;
      rating: TeacherRatingLabel;
    };
  };
  common: {
    rating: string;
    comment: string;
    star: string;
    total: string;
    gender: string;
    statistics: string;
  };
  enum: {
    department: SpecializeLabel;
    gender: GenderLabel;
    role: RoleLabel;
  };
}

export interface TeacherRequestLabel {
  name: string;
  nationality: string;
  gender: string;
  dob: string;
}

export interface SubjectRatingLabel {
  practicality: string;
  difficult: string;
  homework: string;
  testDifficult: string;
  teacherPedagogical: string;
  star: string;
  total: string;
}

export interface TeacherRatingLabel {
  enthusiasm: string;
  friendly: string;
  nonConservatism: string;
  erudition: string;
  pedagogicalLevel: string;
  star: string;
  total: string;
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

export interface SpecializeLabel {
  MANAGEMENT: string;
  NETWORK: string;
  ALL: string;
}

export interface GenderLabel {
  MALE: string;
  FEMALE: string;
}

export interface RoleLabel {
  ADMIN: string;
  MANAGER: string;
  USER: string;
}

export type Language = keyof typeof texts;
