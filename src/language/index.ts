import { english as en } from "./english"
import { japan as ja } from "./japan"
import { vietnamese as vi } from "./vietnamese"

export const texts = {
  en, ja, vi
}

export const LANGUAGE = {
  en: "English", ja: "日本語", vi: "Tiếng Việt"
}

export interface TextFields {
  // Side bar
  navigation: string,
  setting: string,
  darkMode: string,
  language: string,
  // Navigation bar
  dashboard: string;
  subject: string,
  teacher: string,
  other: string,
  user: string,
  // Form
  edit: string,
  delete: string,
  // Subject
  id: string;
  teacherId: string;
  unit: string;
  formYear: string;
  name: string;
  specialize: string;
  disable: string;
  // Specialize
  MANAGEMENT: string;
  NETWORK: string;
  // Other
  notFound: string,
}

export type Language = keyof typeof texts;