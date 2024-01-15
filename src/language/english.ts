import {TextFields} from ".";

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
            plan: "Plan",
            condition: "Condition",
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
            base: {
                teacherId: "Teacher Name",
                credit: "Credit",
                formYear: "Enterable Year",
                name: "Name",
                department: "Department",
                classification: "Classification",
                require: "Require"
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
            name: "Teacher Name",
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
    common: {
        rating: "Rating",
        comment: "Comment",
        gender: "Gender",
        star: "Star",
        total: "Total",
        statistics: "Statistics",
        age: "Age",
        all: "All"
    },
    enum: {
        department: {
            MANAGEMENT: "Management",
            NETWORK: "Network",
            ALL: "Basic",
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
    util: {
        dateFormat: ["", "", ""]
    },
};
