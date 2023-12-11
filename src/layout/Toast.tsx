import {useAppSelector} from "../app/hooks";
import {RootState} from "../app/store";
import {ToastContainer} from "react-toastify";

export const Toast = () => {
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