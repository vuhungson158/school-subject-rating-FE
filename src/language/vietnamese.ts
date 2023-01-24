import { TextFields } from ".";

export const vietnamese: TextFields = {
  layout: {
    sidebar: {
      navigation: "Điều Hướng",
      setting: "Cài đặt",
      userInfo: "Thông tin người dùng",
      darkMode: "Chế độ tối",
      language: "Ngôn ngữ",
    },
    navigation: {
      home: "Trang chủ",
      dashboard: "Bảng Tổng Hợp",
      subject: "Môn học",
      teacher: "Giáo viên",
      other: "Khác",
      user: "Người Dùng",
    },
    form: {
      login: "Đăng nhập",
      logout: "Thoát",
      resign: "Đăng kí",
      get: "Lấy",
      add: "Thêm",
      edit: "Sửa",
      delete: "Xoá",
    },
    notFound: "Sai Địa Chỉ",
  },
  model: {
    base: {
      id: "ID",
      createdAt: "Ngày tạo",
      updatedAt: "Lần cập nhật cuối",
      disable: "Vô Hiệu",
    },
    user: {
      login: {
        username: "Username",
        password: "Mật khẩu",
      },
      request: {
        email: "Email",
        password: "Mật khẩu",
        displayName: "Tên hiển thị",
        role: "Chức danh",
      },
    },
    subject: {
      request: {
        teacherId: "Tên Thầy",
        unit: "Tín Chỉ",
        formYear: "Năm Học",
        name: "Tên",
        specialize: "Thuộc Khoa",
      },
      rating: {
        practicality: "Tính thực tiễn",
        difficult: "Độ khó",
        homework: "Bài tập về nhà",
        testDifficult: "Độ khó của kì thi",
        teacherPedagogical: "Khả năng truyền tải của thầy",
        star: "Sao",
        total: "Tổng số đánh giá",
      },
    },
    teacher: {
      request: {
        name: "Tên thầy",
        nationality: "Quốc tịch",
        dob: "Sinh Nhật",
      },
      rating: {
        enthusiasm: "Nhiệt Huyết",
        friendly: "Thân Thiện",
        nonConservatism: "Ít bảo thủ",
        erudition: "Uyên Bác",
        pedagogicalLevel: "Năng lực truyền đạt",
      },
    },
  },
  common: {
    rating: "Đánh giá",
    comment: "Bình luận",
    gender: "Giới tính",
    star: "Sao",
    total: "Tổng số",
    statistics: "Thống kê",
  },
  enum: {
    specialize: {
      MANAGEMENT: "Kinh tế",
      NETWORK: "Network",
      BASIC: "Cơ bản",
    },
    gender: {
      MALE: "Nam",
      FEMALE: "Nữ",
    },
    role: {
      ADMIN: "Admin",
      MANAGER: "Quản lý",
      USER: "Người dùng cơ bản",
    },
  },
};
