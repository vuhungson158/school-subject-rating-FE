import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "../common";
import Base from "./base";
import Form from "./base/Form";
import Plan from "./plan";
import {PopMode} from "../common/model";
import Rating from "./rating";
import Comment from "./comment";

const Subject = () => {
    return (
        <Box>
            <Routes>
                <Route path="/*" element={<NotFound/>}/>
                <Route path="/" element={<Base/>}>
                    <Route path={PopMode.add} element={<Form mode={PopMode.add}/>}/>
                    <Route path={`/${PopMode.edit}/:id`} element={<Form mode={PopMode.edit}/>}/>
                    <Route path={`/${PopMode.detail}/:id`} element={<Form mode={PopMode.detail}/>}/>
                    <Route path={`/${PopMode.rating}/:id`} element={<Rating/>}/>
                    <Route path={`/${PopMode.comment}/:id`} element={<Comment/>}/>
                </Route>
                <Route path="/plan" element={<Plan/>}/>
            </Routes>
        </Box>
    );
};
export default Subject;
