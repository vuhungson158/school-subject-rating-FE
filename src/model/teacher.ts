import { BaseEntity, Gender, Rating } from ".";

export const keyofTeacherEntity: string[] = [
  "id",
  "name",
  "nationality",
  "gender",
  "dob",
];

export interface TeacherEntity extends BaseEntity, TeacherRequest {}

export interface TeacherRequest {
  name: string;
  nationality: string;
  gender: Gender;
  dob: string;
}

export interface TeacherRatingEntity extends BaseEntity, TeacherRatingAverage {
  userId: number;
  teacherId: number;
}

export interface TeacherRatingAverage extends Rating {
  enthusiasm: number;
  friendly: number;
  nonConservatism: number;
  erudition: number;
  pedagogicalLevel: number;
}

const fakeData = () => ({
  id: Math.floor(Math.random() * 5 + 1),
  name: ["合田", "井上", "古川", "橋本", "車"][Math.floor(Math.random() * 5)],
  gender: ["MALE", "FELMALE"][Math.floor(Math.random() * 2)] as Gender,
  nationality: ["データサイエンス", "IT技術", "文学", "哲学", "音楽"][
    Math.floor(Math.random() * 5)
  ],
  dob: new Date().toJSON().slice(0, 10),
  disable: Math.random() < 0.1,
});

export const fakeTeacherList = () => {
  const subjectList = [];
  for (let i = 0; i < 30; i++) {
    subjectList.push(fakeData());
  }
  return subjectList;
};
