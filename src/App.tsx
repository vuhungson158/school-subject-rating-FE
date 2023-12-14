import {CssBaseline} from "@mui/material";
import "react-toastify/dist/ReactToastify.min.css";
import {Layout, PopUps, Toast} from "./layout";
import {ThemeProvider} from "./layout/ThemeProvider";
import {BaseRoutes} from "./features/BaseRoutes";

const App = () => (
    <div className="App">
        <ThemeProvider>
            <CssBaseline/>
            <Layout>
                <BaseRoutes/>
            </Layout>
            <PopUps/>
            <Toast/>
        </ThemeProvider>
    </div>
)

export default App;
