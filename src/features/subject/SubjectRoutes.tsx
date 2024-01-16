import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../common";
import SubjectListPage from "./base/SubjectListPage";
import {PopMode} from "../../constant/featureLabel";
import {SubjectAddPopup} from "./base/SubjectAddPopup";
import {SubjectEditPopup} from "./base/SubjectEditPopup";
import {SubjectDetailPopup} from "./base/SubjectDetailPopup";

const SubjectRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path="/*" element={<NotFoundPage/>}/>
                <Route path="/" element={<SubjectListPage/>}>
                    <Route path={PopMode.ADD} element={<SubjectAddPopup/>}/>
                    <Route path={`:id/${PopMode.EDIT}`} element={<SubjectEditPopup/>}/>
                    <Route path={`:id/${PopMode.DETAIL}`} element={<SubjectDetailPopup/>}/>
                    {/*<Route path={`/${PopMode.RATING}/:id`} element={<Rating/>}/>*/}
                    {/*<Route path={`/${PopMode.COMMENT}/:id`} element={<Comment/>}/>*/}
                    {/*<Route path="/plan" element={<Plan/>}/>*/}
                </Route>
            </Routes>
        </Box>
    );
};
export default SubjectRoutes;
