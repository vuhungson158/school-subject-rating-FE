import {Routes as Router, Navigate, Route} from "react-router-dom";
import {NotFound} from "../layout/NotFound";
import {navLinkList} from "../constant";

export const Routes = () => {
    return (
        <Router>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Navigate to="/dashboard"/>}/>

            {navLinkList.map((item, index) => (
                <Route key={index} path={`/${item.linkTo}/*`} element={item.component ? <item.component/> :
                    <NotFound/>}/>
            ))}
        </Router>
    );
};