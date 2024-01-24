import {CssBaseline} from "@mui/material";
import "react-toastify/dist/ReactToastify.min.css";
import {Layout, ThemeProvider, Toast} from "./layout";
import {BaseRoutes} from "./features/BaseRoutes";

const App = () => (
    <div className="App">
        <ThemeProvider>
            <CssBaseline/>
            <Layout>
                <BaseRoutes/>
            </Layout>
            <Toast/>
        </ThemeProvider>
    </div>
)

export default App;
