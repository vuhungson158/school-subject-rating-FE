import {Box, Container} from "@mui/material";
import {Sidebar} from "./Sidebar";
import {Breadcrumb} from "./Breadcrumb";
import {NavBar} from "./Navbar";

export const Layout = ({children}: { children: JSX.Element }) => {
    return (
        <Box>
            <NavBar/>
            <Sidebar/>

            <Container maxWidth="lg">
                <Breadcrumb/>
                <Box mt={4}>{children}</Box>
            </Container>
        </Box>
    );
};
