import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes as RouteList } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { navLinkList } from "./constant";
import { actions, LoginPage, UserResign } from "./features/auth/";
import { NotFound } from "./features/common";
import subjectThunk from "./features/subject/base/thunk";
import teacherThunk from "./features/teacher/base/thunk";
import { Layout } from "./layout";
import { LocalStorageUtil } from "./util";

function App() {
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);

  useEffect(() => {
    LocalStorageUtil.hasToken() &&
      dispatch(actions.setToken(LocalStorageUtil.getToken()));
    LocalStorageUtil.hasUser() &&
      dispatch(actions.setUser(LocalStorageUtil.getUser()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(subjectThunk.fetchAll());
    dispatch(teacherThunk.fetchAll());
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes />
        </Layout>
        <PopUps />
        <Toast />
      </ThemeProvider>
    </div>
  );
}

const PopUps = () => {
  return (
    <Box>
      <LoginPage />
      <UserResign />
    </Box>
  );
};

const Toast = () => {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkTheme ? "dark" : "light"}
    />
  );
};

const Routes = () => {
  return (
    <RouteList>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {navLinkList.map((item, index) => (
        <Route
          key={index}
          path={`/${item.linkTo}/*`}
          element={item.component ? <item.component /> : <NotFound />}
        />
      ))}
    </RouteList>
  );
};

export default App;
