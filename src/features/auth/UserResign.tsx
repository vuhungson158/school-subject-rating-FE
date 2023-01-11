import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { UserRequest } from "../../model";
import { authActions } from "./authSlice";

export const UserResign = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const resignBackdropOpen = useAppSelector(
    (state: RootState) => state.auth.resignBackdropOpen,
  );
  const initialValues: UserRequest = {
    username: "",
    password: "",
    displayName: "",
    gender: "MALE",
    role: "USER",
  };
  const { control, handleSubmit } = useForm<UserRequest>({
    defaultValues: initialValues,
  });
  return (
    <Dialog
      open={resignBackdropOpen}
      onClose={() => dispatch(authActions.setResignBackdropOpen(false))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          Login
        </DialogTitle>
        <Box borderRadius={16}>
          <form
            onSubmit={handleSubmit((user: UserRequest) => {
              // dispatch(authThunk.login(user));
            })}>
            {/* <TextNumberField name="username" control={control} label="Username" />
            <TextNumberField
              name="password"
              control={control}
              label="Password"
              type="password"
            /> */}
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
