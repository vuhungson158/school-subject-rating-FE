import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../page/NotFoundPage";
import TeacherListPage from "./base/TeacherListPage";
import {PopMode} from "../../model/commonModel";
import {TeacherAddPopup} from "./base/TeacherAddPopup";

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<TeacherListPage/>}>
                <Route path={PopMode.add} element={<TeacherAddPopup/>}/>
                {/*<Route path="/:id" element={<Detail />} />*/}
            </Route>
        </Routes>
    );
};
export default TeacherRoutes;
