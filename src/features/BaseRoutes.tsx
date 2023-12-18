import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../page/NotFoundPage";
import {HomePage} from "../page/HomePage";
import TeacherRoutes from "./teacher/TeacherRoutes";
import {TEACHER} from "../constant/featureLabel";

export const BaseRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<HomePage/>}/>

            {/*<Route path={`/${DASHBOARD}`} element={<DashboardRoutes/>}/>*/}
            <Route path={`/${TEACHER}/*`} element={<TeacherRoutes/>}/>
            {/*<Route path={`/${SUBJECT}`} element={<SubjectRoutes/>}/>*/}
        </Routes>
    );
};