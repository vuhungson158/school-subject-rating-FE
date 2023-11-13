import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "../common";
import Base from "./base";
import Plan from "./plan";
import {PopMode} from "../common/model";
import Rating from "./rating";
import Comment from "./comment";
import {AddForm, DeletePop, EditForm} from "./base/Form";
import Detail from "./base/Detail";

const Subject = () => {
    return (
        <Box>
            <Routes>
                <Route path="/*" element={<NotFound/>}/>
                <Route path="/" element={<Base/>}>
                    <Route path={PopMode.add} element={<AddForm/>}/>
                    <Route path={`/${PopMode.edit}/:id`} element={<EditForm/>}/>
                    <Route path={`/${PopMode.delete}/:id`} element={<DeletePop/>}/>
                    <Route path={`/${PopMode.detail}/:id`} element={<Detail/>}/>
                    <Route path={`/${PopMode.rating}/:id`} element={<Rating/>}/>
                    <Route path={`/${PopMode.comment}/:id`} element={<Comment/>}/>
                </Route>
                <Route path="/plan" element={<Plan/>}/>
            </Routes>
        </Box>
    );
};
export default Subject;
