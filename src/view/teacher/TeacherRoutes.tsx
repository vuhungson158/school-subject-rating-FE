import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../page/NotFoundPage";
import {TeacherAddPopup} from "./base/TeacherAddPopup";
import {TeacherDetailPopup} from "./base/TeacherDetailPopup";
import {PopMode} from "../../common/enums";
import {TeacherEditPopup} from "./base/TeacherEditPopup";
import {TeacherListPage} from "./base/TeacherListPage";

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
