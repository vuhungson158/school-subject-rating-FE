import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../page/NotFoundPage";
import TeacherListPage from "./base/TeacherListPage";
import {PopMode} from "../../model/commonModel";
import {TeacherAddPopup} from "./base/TeacherAddPopup";
import {TeacherDetailPopup} from "./base/TeacherDetailPopup";

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<TeacherListPage/>}>
                <Route path={PopMode.add} element={<TeacherAddPopup/>}/>
                <Route path={`:id/${PopMode.detail}`} element={<TeacherDetailPopup/>}/>
            </Route>
        </Routes>
    );
};
export default TeacherRoutes;
