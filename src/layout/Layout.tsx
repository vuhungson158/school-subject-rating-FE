import { Box, Container } from "@mui/material";
import { Breadcrumb, Sidebar } from "./";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <Box>
      <Sidebar />

      <Container maxWidth="lg">
        <Breadcrumb />
        <Box mt={4}>{children}</Box>
      </Container>
    </Box>
  );
};
