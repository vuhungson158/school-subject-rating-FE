import { BaseEntity, Rating, Specialize } from ".";

export const keyofSubjectEntity: string[] = [
  "name",
  "teacherId",
  "unit",
  "formYear",
  "specialize",
];

export interface SubjectEntity extends BaseEntity, SubjectRequest {}

export interface SubjectRequest {
  name: string;
  teacherId: number;
  unit: number;
  formYear: number;
  specialize: Specialize;
}

export interface SubjectAverageRating extends Rating {
  practicality: number;
  difficult: number;
  homework: number;
  testDifficult: number;
  teacherPedagogical: number;
  star: number;
}

export interface SubjectRatingRequest extends SubjectAverageRating {
  userId: number;
  subjectId: number;
}

export interface SubjectRatingEntity extends BaseEntity, SubjectRatingRequest {}
export interface SubjectWithAvgRating extends SubjectEntity, SubjectAverageRating {}

const fakeData = () => ({
  id: Math.floor(Math.random() * 300),
  formYear: Math.floor(Math.random() * 4 + 1),
  name: ["データサイエンス", "IT技術", "文学", "哲学", "音楽"][
    Math.floor(Math.random() * 5)
  ],
  specialize: ["MANAGEMENT", "NETWORK"][Math.floor(Math.random() * 2)] as Specialize,
  teacherId: Math.floor(Math.random() * 5 + 1),
  unit: Math.floor(Math.random() * 6 + 1),
  disable: Math.random() < 0.1,
});

export const fakeSubjectList = () => {
  const subjectList = [];
  for (let i = 0; i < 200; i++) {
    subjectList.push(fakeData());
  }
  return subjectList;
};

// export const fakeSubjectDetail = (
//   subjectEntity: SubjectEntity,
// ): SubjectWithAvgRating => ({
//   ...subjectEntity,
//   practicality: Math.floor(Math.random() * 100),
//   difficult: Math.floor(Math.random() * 100),
//   homework: Math.floor(Math.random() * 100),
//   testDifficult: Math.floor(Math.random() * 100),
//   teacherPedagogical: Math.floor(Math.random() * 100),
// });

export const createGraphData = (data: SubjectAverageRating) => {
  const result = {
    labels: [
      "practicality",
      "difficult",
      "homework",
      "testDifficult",
      "teacherPedagogical",
    ],
    averages: [
      data.practicality,
      data.difficult,
      data.homework,
      data.testDifficult,
      data.teacherPedagogical,
    ],
    yours: [10, 20, 30, 40, 50],
  };
  return result;
};
