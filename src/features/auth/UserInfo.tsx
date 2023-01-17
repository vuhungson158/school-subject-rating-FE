import { Avatar, Box, Button, TextField } from "@mui/material";
import { authActions, authThunk } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

export const UserInfor = () => {
  const token = useAppSelector((root: RootState) => root.auth.token);
  const user = useAppSelector((root: RootState) => root.auth.user);
  const dispatch = useAppDispatch();

  return (
    <Box marginX={2} marginY={2} paddingY={2}>
      {token ? (
        <Box display="flex" flexDirection="column" alignContent="center">
          <Avatar
            alt={user?.displayName}
            src={user?.avatar}
            sx={{ width: 120, height: 120, marginX: "auto" }}
          />
          <Text label="User Name" value={user?.displayName} />
          <Text label="Gender" value={user?.gender} />
          <Text label="Role" value={user?.role} />
          <Text label="Email" value={user?.email} />
          <Text label="Password" value={user?.password} />

          <Button
            sx={{ marginTop: 2 }}
            size="large"
            color="primary"
            variant="outlined"
            onClick={() => {
              dispatch(authThunk.logout());
            }}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-evenly">
          <Button
            size="large"
            color="primary"
            variant="outlined"
            onClick={() => dispatch(authActions.setLoginBackdropOpen(true))}>
            Login
          </Button>
          <Button
            size="large"
            color="primary"
            variant="outlined"
            onClick={() => dispatch(authActions.setResignBackdropOpen(true))}>
            Resign
          </Button>
        </Box>
      )}
    </Box>
  );
};

const Text = ({ label, value }: { label: string; value?: string | number }) => {
  return (
    <TextField
      margin="dense"
      label={label}
      InputProps={{
        readOnly: true,
      }}
      variant="standard"
      value={value}
    />
  );
};
