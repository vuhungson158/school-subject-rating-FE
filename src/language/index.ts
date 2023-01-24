import { english as en } from "./english";
import { japan as ja } from "./japan";
import { vietnamese as vi } from "./vietnamese";

export const texts = {
  en,
  ja,
  vi,
};

export const LANGUAGE = {
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
    navigation: NavigationI;
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
      request: SubjectRequestI;
      rating: SubjectRatingI;
    };
    teacher: {
      request: TeacherRequestI;
      rating: {
        enthusiasm: string;
        friendly: string;
        nonConservatism: string;
        erudition: string;
        pedagogicalLevel: string;
      };
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
    specialize: SpecializeI;
    gender: Gender;
    role: Role;
  };
}
export interface SubjectRequestI {
  name: string;
  teacherId: string;
  unit: string;
  formYear: string;
  specialize: string;
}
export interface TeacherRequestI {
  name: string;
  nationality: string;
  dob: string;
}

export interface SubjectRatingI {
  practicality: string;
  difficult: string;
  homework: string;
  testDifficult: string;
  teacherPedagogical: string;
  star: string;
  total: string;
}

export interface NavigationI {
  home: string;
  dashboard: string;
  subject: string;
  teacher: string;
  other: string;
  user: string;
}
export interface SpecializeI {
  MANAGEMENT: string;
  NETWORK: string;
  BASIC: string;
}
export interface Gender {
  MALE: string;
  FEMALE: string;
}
export interface Role {
  ADMIN: string;
  MANAGER: string;
  USER: string;
}
export type Language = keyof typeof texts;
