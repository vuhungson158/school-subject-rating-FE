import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../page/NotFoundPage";
import {HomePage} from "../page/HomePage";
import TeacherRoutes from "./teacher/TeacherRoutes";
import {Feature} from "../constant/featureLabel";
import SubjectRoutes from "./subject/SubjectRoutes";

export const BaseRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<HomePage/>}/>

            {/*<Route path={`/${DASHBOARD}`} element={<DashboardRoutes/>}/>*/}
            <Route path={`/${Feature.TEACHER}/*`} element={<TeacherRoutes/>}/>
            <Route path={`/${Feature.SUBJECT}`} element={<SubjectRoutes/>}/>
        </Routes>
    );
};