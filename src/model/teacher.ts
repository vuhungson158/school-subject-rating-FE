import { BaseEntity, Gender, Rating } from ".";

export interface TeacherEntity extends BaseEntity, TeacherRequest {}

export interface TeacherRequest {
  name: string;
  nationality: string;
  gender: Gender;
  dob: string;
}

export const keyofTeacherEntity: string[] = ["name", "nationality", "gender", "dob"];

// Teacher Rating
export const TeacherRatingGraphKeys = [
  "enthusiasm",
  "friendly",
  "nonConservatism",
  "erudition",
  "pedagogicalLevel",
];

interface TeacherRatingBase {
  enthusiasm: number;
  friendly: number;
  nonConservatism: number;
  erudition: number;
  pedagogicalLevel: number;
  star: number;
}
export interface TeacherAverageRating extends TeacherRatingBase, Rating {
  total: number;
}
export interface TeacherRatingRequest extends TeacherRatingBase {
  userId: number;
  teacherId: number;
}
export interface TeacherRatingEntity extends BaseEntity, TeacherRatingRequest {}


// Teacher Comment
export interface TeacherCommentRequest {
  userId: number;
  teacherId: number;
  comment: String;
}
export interface TeacherCommentWithLikeCount extends BaseEntity, TeacherCommentRequest {
  displayName: string;
  likeCount: number;
  dislikeCount: number;
}

export interface TeacherCommentListWithTotal {
  total: number;
  list: TeacherCommentWithLikeCount[];
}

// Comment React
export interface TeacherCommentReactRequest {
  userId: number;
  commentId: number;
  react: boolean;
}
export interface TeacherCommentReactEntity extends TeacherCommentReactRequest, BaseEntity {}


// const fakeData = () => ({
//   id: Math.floor(Math.random() * 5 + 1),
//   name: ["合田", "井上", "古川", "橋本", "車"][Math.floor(Math.random() * 5)],
//   gender: ["MALE", "FELMALE"][Math.floor(Math.random() * 2)] as Gender,
//   nationality: ["データサイエンス", "IT技術", "文学", "哲学", "音楽"][
//     Math.floor(Math.random() * 5)
//   ],
//   dob: new Date().toJSON().slice(0, 10),
//   disable: Math.random() < 0.1,
// });

// export const fakeTeacherList = () => {
//   const teacherList = [];
//   for (let i = 0; i < 30; i++) {
//     teacherList.push(fakeData());
//   }
//   return teacherList;
// };
