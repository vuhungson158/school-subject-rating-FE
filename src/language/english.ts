import { TextFields } from ".";

export const english: TextFields = {
  layout: {
    sidebar: {
      navigation: "Navigation",
      setting: "Setting",
      userInfo: "User Info",
      darkMode: "Dark Mode",
      language: "Language",
    },
    navigation: {
      home: "Home",
      dashboard: "Dashboard",
      subject: "Subject",
      teacher: "Teacher",
      other: "Other",
      user: "User",
    },
    form: {
      login: "Login",
      logout: "Logout",
      resign: "Resign",
      get: "Get",
      add: "Add",
      edit: "Edit",
      delete: "Delete",
    },
    notFound: "Not Found",
  },
  model: {
    base: {
      id: "Id",
      createdAt: "Created Date",
      updatedAt: "Update Date",
      disable: "Disable",
    },
    user: {
      login: {
        username: "User Name",
        password: "Password",
      },
      request: {
        email: "Email",
        password: "Password",
        displayName: "Display Name",
        role: "Role",
      },
    },
    subject: {
      request: {
        teacherId: "Teacher Name",
        unit: "Unit",
        formYear: "Enterable Year",
        name: "Name",
        specialize: "Specialize",
      },
      rating: {
        practicality: "Practicality",
        difficult: "Difficult",
        homework: "Homework's Appropriateness",
        testDifficult: "Test's Difficult",
        teacherPedagogical: "Teacher's Pedagogical",
        star: "Star",
        total: "Total",
      },
    },
    teacher: {
      request: {
        name: "Name",
        gender: "Gender",
        nationality: "Nationality",
        dob: "Birthday",
      },
      rating: {
        enthusiasm: "Enthusiasm",
        friendly: "Friendly",
        nonConservatism: "Unconservatism",
        erudition: "Erudition",
        pedagogicalLevel: "Pedagogical Level",
        star: "Star",
        total: "Total",
      },
    },
  },
  common: {
    rating: "Rating",
    comment: "Comment",
    gender: "Gender",
    star: "Star",
    total: "Total",
    statistics: "Statistics",
  },
  enum: {
    specialize: {
      MANAGEMENT: "Management",
      NETWORK: "Network",
      BASIC: "Basic",
    },
    gender: {
      MALE: "Male",
      FEMALE: "Female",
    },
    role: {
      ADMIN: "Admin",
      MANAGER: "Manager",
      USER: "User",
    },
  },
};
