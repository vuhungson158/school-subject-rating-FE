import { english as en } from "./english";
import { japan as ja } from "./japan";
import { vietnamese as vi } from "./vietnamese";

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
    navigation: NavigationLanguage;
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
      request: SubjectRequestLanguage;
      rating: SubjectRatingLanguage;
    };
    teacher: {
      request: TeacherRequestLanguage;
      rating: TeacherRatingLanguage;
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
    specialize: SpecializeLanguage;
    gender: GenderLanguage;
    role: RoleLanguage;
  };
}
export interface SubjectRequestLanguage {
  name: string;
  teacherId: string;
  unit: string;
  formYear: string;
  specialize: string;
}
export interface TeacherRequestLanguage {
  name: string;
  nationality: string;
  gender: string;
  dob: string;
}

export interface SubjectRatingLanguage {
  practicality: string;
  difficult: string;
  homework: string;
  testDifficult: string;
  teacherPedagogical: string;
  star: string;
  total: string;
}

export interface TeacherRatingLanguage {
  enthusiasm: string;
  friendly: string;
  nonConservatism: string;
  erudition: string;
  pedagogicalLevel: string;
  star: string;
  total: string;
}

export interface NavigationLanguage {
  home: string;
  dashboard: string;
  subject: string;
  teacher: string;
  other: string;
  user: string;
  plan: string;
  condition: string;
}
export interface SpecializeLanguage {
  MANAGEMENT: string;
  NETWORK: string;
  BASIC: string;
}
export interface GenderLanguage {
  MALE: string;
  FEMALE: string;
}
export interface RoleLanguage {
  ADMIN: string;
  MANAGER: string;
  USER: string;
}
export type Language = keyof typeof texts;
