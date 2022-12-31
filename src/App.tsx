import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import Layout from "./layout";

function App() {
  const darkTheme = useAppSelector((root: RootState) => root.common.darkTheme);

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
