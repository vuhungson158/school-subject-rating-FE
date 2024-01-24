import {Box, Container} from "@mui/material";
import {Sidebar} from "./Sidebar";
import {Breadcrumb} from "./Breadcrumb";
import {NavBar} from "./Navbar";

export const Layout = ({children}: { children: JSX.Element }) => {
    return (
        <Box>
            <Sidebar/>

            <Container maxWidth="lg">
                <NavBar/>
                <Breadcrumb/>
                <Box mt={4}>{children}</Box>
            </Container>
        </Box>
    );
};
