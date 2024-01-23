import {Box} from "@mui/material";
import {LoginPage} from "../features/auth/LoginForm";
import {UserResign} from "../features/auth/UserResign";

export const PopUps = () => {
    return (
        <Box>
            <LoginPage/>
            <UserResign/>
        </Box>
    );
};