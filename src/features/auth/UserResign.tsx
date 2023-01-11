import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { object, ref, string } from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { RadioGroupField, TextNumberField } from "../../formFields";
import { UserRequest } from "../../model";
import { authActions } from "./authSlice";
import { authThunk } from "./authThunk";

export const UserResign = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const resignBackdropOpen = useAppSelector(
    (state: RootState) => state.auth.resignBackdropOpen,
  );

  const schema = object({
    email: string().email().required(),
    password: string().min(6).max(16).required(),
    passwordConfirm: string().oneOf([ref("password"), null], "2 Password not match"),
    displayName: string().max(16).required(),
  }).required();

  const initialValues: UserRequest = {
    email: "",
    password: "",
    displayName: "",
    gender: "MALE",
    role: "USER",
  };
  const { control, handleSubmit } = useForm<UserRequest>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  return (
    <Dialog
      open={resignBackdropOpen}
      onClose={() => dispatch(authActions.setResignBackdropOpen(false))}>
      <DialogContent sx={{ backgroundColor: "background.default" }}>
        <DialogTitle textAlign="center" fontSize={48}>
          Resign
        </DialogTitle>
        <Box borderRadius={16}>
          <form
            onSubmit={handleSubmit((user: UserRequest) => {
              dispatch(authThunk.resign(user));
            })}>
            <TextNumberField
              name="email"
              control={control}
              label="Email (User Name)"
            />
            <TextNumberField
              name="password"
              control={control}
              label="Password"
              type="password"
            />
            <TextNumberField
              name="passwordConfirm"
              control={control}
              label="Password Again"
              type="password"
            />
            <TextNumberField
              name="displayName"
              control={control}
              label="Display Name"
            />
            <RadioGroupField
              name="gender"
              control={control}
              label="Gender"
              options={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
              ]}
            />
            <Box mt={4}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}>
                {isLoading ? <CircularProgress /> : "Resign"}
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
