import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { navLinkItems } from "../constant/navLink";
import { NotFound } from "./NotFound";
import { Sidebar } from "./Sidebar";

const index = () => {
  return (
    <div>
      <Sidebar />
      <Container maxWidth="lg">
        <Box mt={4}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            {navLinkItems.map((item, index) => (
              <Route
                key={index}
                path={`/${item.linkTo}/*`}
                element={item.component ? <item.component /> : <NotFound />}
              />
            ))}
          </Routes>
        </Box>
      </Container>
    </div>
  );
};

export default index;
