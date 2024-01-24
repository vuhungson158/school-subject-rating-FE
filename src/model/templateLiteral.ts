export const ALL = "ALL" as const;

type TemplateLiteralArray = ReadonlyArray<string>
export type TemplateLiteral<T extends TemplateLiteralArray = TemplateLiteralArray> = T[number]
export type TemplateLiteralSelect = TemplateLiteral | typeof ALL;

export type Nationality = TemplateLiteral<typeof nationalities>;
export const nationalities = [
    "AUSTRALIA", "SOUTH_KOREA", "JAPAN", "INDIA", "VIETNAM"
] as const;

export type Department = TemplateLiteral<typeof departments>;
export const departments = [
    "MANAGEMENT", "NETWORK", "ALL"
] as const;
export const departmentListExceptAll: Department[] = departments
    .filter((department: Department): boolean => department !== "ALL");

export type Gender = TemplateLiteral<typeof genders>;
export const genders = ["MALE", "FEMALE"] as const;

export type YesNo = TemplateLiteral<typeof yesNos>;
export const yesNos = ["YES", "NO"] as const;

export type Status = TemplateLiteral<typeof statuses>;
export const statuses = ["SUCCESS", "ERROR", "PRIMARY"] as const;

export type MuiColor = TemplateLiteral<typeof muiColors>;
export const muiColors = [
    'inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'
] as const;

export type Limit = (typeof limitValues)[number];
export const limitValues = [5, 10, 15, 20, 25] as const;
