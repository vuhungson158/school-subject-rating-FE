import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { useForm } from "react-hook-form";
import { actions } from "./index";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { FormInputText } from "../../HookFormInput";
import { Login } from "./model";
import thunk from "./thunk";

const initialValues: Login = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const texts = useAppSelector((root: RootState) => root.common.texts);
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const loginBackdropOpen = useAppSelector(
    (state: RootState) => state.auth.loginBackdropOpen,
  );

  const { control, handleSubmit } = useForm<Login>({
    defaultValues: initialValues,
  });

  return (
    <Dialog
      open={loginBackdropOpen}
      onClose={() => dispatch(actions.setLoginBackdropOpen(false))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          {texts.layout.form.login}
        </DialogTitle>
        <Box borderRadius={16}>
          <form
            onSubmit={handleSubmit((user: Login) => {
              dispatch(
                thunk.login({
                  // email: Util.hash(user.email),
                  // password: Util.hash(user.password),
                  ...user,
                }),
              );
              console.log(isLoading);
            })}>
            <FormInputText
              name="email"
              control={control}
              label={texts.model.user.login.username}
            />
            <FormInputText
              name="password"
              control={control}
              label={texts.model.user.login.password}
              type="password"
            />
            <Box mt={4}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}>
                {isLoading ? <CircularProgress /> : texts.layout.form.login}
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
