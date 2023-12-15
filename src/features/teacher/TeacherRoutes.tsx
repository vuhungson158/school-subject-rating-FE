import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../page/NotFoundPage";
import TeacherListPage from "./base/TeacherListPage";

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<TeacherListPage/>}>
                {/*<Route path="/:id" element={<Detail />} />*/}
            </Route>
        </Routes>
    );
};
export default TeacherRoutes;
