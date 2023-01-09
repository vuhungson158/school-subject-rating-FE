import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { authActions } from "./features/auth/authSlice";
import Backdrops from "./constant/Backdrops";
import Layout from "./layout";
import { getToken, getUser, hasToken, hasUser } from "./util";
import { subjectThunk } from "./features/subject/subjectThunk";
import { teacherThunk } from "./features/teacher/teacherThunk";

function App() {
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);

  useEffect(() => {
    hasToken() && dispatch(authActions.setToken(getToken()));
    hasUser() && dispatch(authActions.setUser(getUser()));
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
        <Layout />
        <Backdrops />

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
      </ThemeProvider>
    </div>
  );
}

export default App;
