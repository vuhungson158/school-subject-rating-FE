import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../common";
import Rating from "./rating";
import Comment from "./comment";
import {AddForm, EditForm} from "./base/Form";
import {PopMode} from "../../constant/featureLabel";

const SubjectRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path="/*" element={<NotFoundPage/>}/>
                <Route path="/" element={<SubjectListPage/>}>
                    <Route path={PopMode.ADD} element={<AddForm/>}/>
                    <Route path={`/${PopMode.EDIT}/:id`} element={<EditForm/>}/>
                    <Route path={`/${PopMode.RATING}/:id`} element={<Rating/>}/>
                    <Route path={`/${PopMode.COMMENT}/:id`} element={<Comment/>}/>
                    {/*<Route path={`/${PopMode.detail}/:id`} element={<Form mode={PopMode.detail}/>}/>*/}
                    {/*<Route path="/plan" element={<Plan/>}/>*/}
                </Route>
            </Routes>
        </Box>
    );
};
export default SubjectRoutes;
