import { TextFields } from ".";
import {Util} from "../util";

export const japan: TextFields = {
  layout: {
    sidebar: {
      navigation: "ナビゲーション",
      setting: "設定",
      userInfo: "ユーザーの情報",
      darkMode: "ダークモード",
      language: "言語",
    },
    navigation: {
      home: "ホーム",
      dashboard: "ダースボード",
      subject: "科目",
      teacher: "先生",
      other: "他の",
      user: "ユーザー",
      plan: "Plan",
      condition: "Condition",
    },
    form: {
      login: "ログイン",
      logout: "ログアウト",
      resign: "新規登録",
      get: "収集",
      add: "追加",
      edit: "編集",
      delete: "削除",
    },
    notFound: "見つかりません",
  },
  model: {
    base: {
      id: "ID",
      createdAt: "追加日",
      updatedAt: "最終編集日",
      disable: "ディザブル",
    },
    user: {
      login: {
        username: "ユーザーネーム",
        password: "パスワード",
      },
      request: {
        email: "Eメール",
        password: "パスワード",
        displayName: "表示名前",
        role: "役職",
      },
    },
    subject: {
      request: {
        teacherId: "先生名",
        credit: "単位",
        formYear: "学年",
        name: "名前",
        department: "学科",
        classification: "分類",
        require: "必須"
      },
      rating: {
        practicality: "実用性",
        difficult: "難易度の適性度",
        homework: "宿題の適性度",
        testDifficult: "テストの難易度の適性度",
        teacherPedagogical: "先生の教育能力",
        star: "星",
        total: "評価の総数",
      },
    },
    teacher: {
        name: "先生名",
        gender: "性別",
        nationality: "国籍",
        dob: "誕生日",
    },
    rating: {
      enthusiasm: "熱意",
      friendly: "フレンドリー",
      nonConservatism: "頭が柔らかい",
      erudition: "博学度",
      pedagogicalLevel: "教育能力",
      star: "星",
      total: "評価の総数",
    },
  },
  common: {
    rating: "評価",
    comment: "コメント",
    gender: "性別",
    star: "星",
    total: "総数",
    statistics: "統計",
    age: "歳"
  },
  enum: {
    department: {
      MANAGEMENT: "経営",
      NETWORK: "ネットワーク",
      ALL: "基礎",
    },
    gender: {
      MALE: "男",
      FEMALE: "女",
    },
    role: {
      ADMIN: "最高管理者",
      MANAGER: "管理者",
      USER: "ユーザー",
    },
  },
  util: {
    formatDate: (date: Date): string => {
      return Util.formatDate(date, "年", "月", "日");
    }
  },
};
