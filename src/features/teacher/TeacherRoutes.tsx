import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../page/NotFoundPage";
import TeacherListPage from "./base/TeacherListPage";
import {TeacherAddPopup} from "./base/TeacherAddPopup";
import {TeacherDetailPopup} from "./base/TeacherDetailPopup";
import {PopMode} from "../../constant/featureLabel";

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<TeacherListPage/>}>
                <Route path={PopMode.ADD} element={<TeacherAddPopup/>}/>
                <Route path={`:id/${PopMode.DETAIL}`} element={<TeacherDetailPopup/>}/>
            </Route>
        </Routes>
    );
};
export default TeacherRoutes;
