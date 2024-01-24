import {Route, Routes} from "react-router-dom";
import {PopMode} from "../../common/enums";
import {SubjectAddPopup} from "./base/SubjectAddPopup";
import {SubjectEditPopup} from "./base/SubjectEditPopup";
import {SubjectDetailPopup} from "./base/SubjectDetailPopup";
import {SubjectListPage} from "./base/SubjectListPage";
import {NotFoundPage} from "../../ui/page/NotFoundPage";

const SubjectRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<SubjectListPage/>}>
                <Route path={PopMode.ADD} element={<SubjectAddPopup/>}/>
                <Route path={`:id/${PopMode.DETAIL}`} element={<SubjectDetailPopup/>}/>
                <Route path={`:id/${PopMode.EDIT}`} element={<SubjectEditPopup/>}/>
                {/*<Route path={`/${PopMode.RATING}/:id`} element={<Rating/>}/>*/}
                {/*<Route path={`/${PopMode.COMMENT}/:id`} element={<Comment/>}/>*/}
                {/*<Route path="/plan" element={<Plan/>}/>*/}
            </Route>
        </Routes>
    );
};
export default SubjectRoutes;
