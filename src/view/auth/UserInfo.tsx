import {Avatar, Box, Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import authThunk from "../../thunk/authThunk";
import {authReduxActions} from "../../app/authSlice";

export const UserInfor = () => {
    const dispatch = useAppDispatch();
    const texts = useAppSelector((root: RootState) => root.common.texts);
    const {displayName, email, password, role} = texts.model.user;
    const {gender, role: userRole} = texts.enum;

    const token = useAppSelector((root: RootState) => root.auth.token);
    const user = useAppSelector((root: RootState) => root.auth.user);

    return (
        <Box marginY={2} paddingY={2}>
            {token ? (
                <Box display="flex" flexDirection="column" alignContent="center">
                    <Avatar
                        alt={user?.displayName}
                        src={user?.avatar}
                        sx={{width: 120, height: 120, marginX: "auto"}}
                    />
                    <Text label={displayName} value={user?.displayName}/>
                    {/*<Text*/}
                    {/*    label={texts.common.gender}*/}
                    {/*    value={gender[user?.gender as keyof GenderLanguage]}*/}
                    {/*/>*/}
                    {/*<Text label={role} value={userRole[user?.role as keyof RoleLanguage]}/>*/}
                    {/*<Text label={email} value={user?.email}/>*/}
                    {/*<Text label={password} value={user?.password}/>*/}

                    <Button
                        sx={{marginTop: 2}}
                        size="large"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                            dispatch(authThunk.logout());
                        }}>
                        {texts.layout.form.logout}
                    </Button>
                </Box>
            ) : (
                <Box display="flex" justifyContent="space-evenly">
                    <Button
                        size="large"
                        color="primary"
                        variant="outlined"
                        onClick={() => dispatch(authReduxActions.setLoginBackdropOpen(true))}>
                        {texts.layout.form.login}
                    </Button>
                    <Button
                        size="large"
                        color="primary"
                        variant="outlined"
                        onClick={() => dispatch(authReduxActions.setResignBackdropOpen(true))}>
                        {texts.layout.form.resign}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

const Text = ({label, value}: { label: string; value?: string | number }) => {
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
