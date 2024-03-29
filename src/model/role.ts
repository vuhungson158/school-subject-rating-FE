export enum Permission {
    SUBJECT_GET_ALL,
    SUBJECT_CREATE,
    SUBJECT_UPDATE,
    SUBJECT_DELETE,
    SUBJECT_RATING_GET_ALL,
    SUBJECT_RATING_CREATE,
    SUBJECT_RATING_UPDATE,
    SUBJECT_RATING_DELETE,

    TEACHER_GET_ALL,
    TEACHER_CREATE,
    TEACHER_UPDATE,
    TEACHER_DELETE,
    TEACHER_RATING_GET_ALL,
    TEACHER_RATING_CREATE,
    TEACHER_RATING_UPDATE,
    TEACHER_RATING_DELETE,

    COMMENT_GET_ALL,
    COMMENT_CREATE,
    COMMENT_UPDATE,
    COMMENT_DELETE,
    COMMENT_REACT_GET_ALL,
    COMMENT_REACT_CREATE,
    COMMENT_REACT_UPDATE,
    COMMENT_REACT_DELETE,

    FILE_GET_ALL,
    FILE_CREATE,
    FILE_UPDATE,
    FILE_DELETE,
    OTHER_GET_ALL,
    OTHER_CREATE,
    OTHER_UPDATE,
    OTHER_DELETE,
}

export const Role = {
    ADMIN: Object.values(Permission),
    MANAGER: [
        Permission.SUBJECT_GET_ALL,
        Permission.SUBJECT_CREATE,
        Permission.SUBJECT_UPDATE,

        Permission.SUBJECT_RATING_GET_ALL,

        Permission.TEACHER_GET_ALL,
        Permission.TEACHER_CREATE,
        Permission.TEACHER_UPDATE,

        Permission.TEACHER_RATING_GET_ALL,

        Permission.COMMENT_GET_ALL,
        Permission.COMMENT_REACT_GET_ALL,
    ],
    USER: [
        Permission.SUBJECT_RATING_CREATE,
        Permission.SUBJECT_RATING_UPDATE,
        Permission.SUBJECT_RATING_DELETE,

        Permission.TEACHER_RATING_CREATE,
        Permission.TEACHER_RATING_UPDATE,
        Permission.TEACHER_RATING_DELETE,

        Permission.COMMENT_GET_ALL,
        Permission.COMMENT_CREATE,
        Permission.COMMENT_UPDATE,
        Permission.COMMENT_DELETE,

        Permission.COMMENT_REACT_GET_ALL,
        Permission.COMMENT_REACT_CREATE,
        Permission.COMMENT_REACT_UPDATE,
        Permission.COMMENT_REACT_DELETE,
    ],
};

export type RoleKeys = keyof typeof Role;
export type Authority = keyof typeof Permission;
