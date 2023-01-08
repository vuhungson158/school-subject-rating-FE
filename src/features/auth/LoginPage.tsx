import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { TextNumberField } from "../../formFields";
import { UserLogin } from "../../model";
import { authActions } from "./authSlice";
import { authThunk } from "./authThunk";

const initialValues: UserLogin = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const loginBackdropOpen = useAppSelector(
    (state: RootState) => state.auth.loginBackdropOpen,
  );

  const { control, handleSubmit } = useForm<UserLogin>({
    defaultValues: initialValues,
  });

  return (
    <Dialog
      open={loginBackdropOpen}
      onClose={() => dispatch(authActions.setLoginBackdropOpen(false))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          Login
        </DialogTitle>
        <Box borderRadius={16}>
          <form
            onSubmit={handleSubmit((user: UserLogin) => {
              dispatch(authThunk.login(user));
            })}>
            <TextNumberField name="username" control={control} label="Username" />
            <TextNumberField
              name="password"
              control={control}
              label="Password"
              type="password"
            />
            <Box mt={4}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}>
                {isLoading ? <CircularProgress /> : "Login"}
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
