export * from "./english";
export * from "./japan";
export * from "./vietnamese";

export type Language = "english" | "japan" | "vietnamese";

export const LANGUAGE = {
  english: "English", japan: "日本語", vietnamese: "Tiếng Việt"
}

export interface TextFields {
  // Side bar
  navigation: string,
  setting: string,
  darkMode: string,
  language: string,
  // Navigation bar
  subject: string,
  teacher: string,
  other: string,
  user: string,
  // Form
  edit: string,
  delete: string,
  // Other
  notFound: string,
}