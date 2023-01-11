import { Avatar, Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { authActions } from "../features/auth/authSlice";
import { removeToken, removeUser } from "../util";

const UserInfor = () => {
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
          <TextField
            margin="dense"
            label="User Name"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            value={user?.displayName}
          />
          <TextField
            margin="dense"
            label="Gender"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            value={user?.gender}
          />
          <TextField
            margin="dense"
            label="Role"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            value={user?.role}
          />
          <Button
            sx={{ marginTop: 2 }}
            size="large"
            color="primary"
            variant="outlined"
            onClick={() => {
              removeToken();
              removeUser();
              dispatch(authActions.removeToken());
              dispatch(authActions.removeUser());
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

export default UserInfor;
