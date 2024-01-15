import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../page/NotFoundPage";
import TeacherListPage from "./base/TeacherListPage";
import {TeacherAddPopup} from "./base/TeacherAddPopup";
import {TeacherDetailPopup} from "./base/TeacherDetailPopup";
import {PopMode} from "../../constant/featureLabel";
import {TeacherEditPopup} from "./base/TeacherEditPopup";

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<TeacherListPage/>}>
                <Route path={PopMode.ADD} element={<TeacherAddPopup/>}/>
                <Route path={`:id/${PopMode.DETAIL}`} element={<TeacherDetailPopup/>}/>
                <Route path={`:id/${PopMode.EDIT}`} element={<TeacherEditPopup/>}/>
            </Route>
        </Routes>
    );
};
export default TeacherRoutes;
