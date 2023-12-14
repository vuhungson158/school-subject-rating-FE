import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../../common";
import SubjectListPage from "./base/SubjectListPage";
import {PopMode} from "../../common/model";
import Rating from "./rating";
import Comment from "./comment";
import {AddForm, EditForm} from "./base/Form";

const SubjectRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path="/*" element={<NotFoundPage/>}/>
                <Route path="/" element={<SubjectListPage/>}>
                    <Route path={PopMode.add} element={<AddForm/>}/>
                    <Route path={`/${PopMode.edit}/:id`} element={<EditForm/>}/>
                    <Route path={`/${PopMode.rating}/:id`} element={<Rating/>}/>
                    <Route path={`/${PopMode.comment}/:id`} element={<Comment/>}/>
                    {/*<Route path={`/${PopMode.detail}/:id`} element={<Form mode={PopMode.detail}/>}/>*/}
                    {/*<Route path="/plan" element={<Plan/>}/>*/}
                </Route>
            </Routes>
        </Box>
    );
};
export default SubjectRoutes;
