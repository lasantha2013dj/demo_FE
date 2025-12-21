import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginForm from "./LoginForm";
import LogoutIcon from "@mui/icons-material/Logout";
import LogOutForm from "./LogOutForm";

export default function NavigationBar() {

    const [open, setOpen] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogOut, setOpenLogOut] = useState(false);
    const [error, setError] = useState('');
    const [color, setColor] = useState("blue");
    const [student, setStudent] = useState({
        studentID: '',
        firstName: '',
        lastName: '',
        password: ''
    })
    const [userDetails, setUserDetails] = useState({
        token: null,
        userName: null
    });

    const onSignUp = () => {
        setOpenSignUp(true)
    };

    const onSuccessLogin = (data) => {
        console.log("login Details: ", data)
        setOpen(false);
        setOpenSignUp(false);
        setError("")
        setUserDetails({
            token: data.data,
            userName: data.userName
        })
    };

    const onSuccessSignUp = () => {
        setOpenSignUp(false);
        setError("")
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Check Student from Here!
                    </Typography>
                    {
                        !userDetails.userName &&
                        <Button color="inherit"
                                onClick={() => setOpen(true)}>
                            Login
                        </Button>
                    }

                    {
                        userDetails.userName &&
                        <Button color="inherit"
                                onClick={() => setOpenLogOut(true)}
                                startIcon={<LogoutIcon/>}>
                            {userDetails.userName}
                        </Button>
                    }

                </Toolbar>
            </AppBar>

            <LoginForm
                student={student}
                setStudent={setStudent}
                error={error}
                setError={setError}
                color={color}
                setColor={setColor}
                onSuccessLogin={onSuccessLogin}
                onSuccessSignUp={onSuccessSignUp}
                isOpen={open}
                openSignUp={openSignUp}
                onSignUp={onSignUp}
                onClose={() => {
                    setOpen(false);
                    setOpenSignUp(false);
                    setOpenLogOut(false);
                    setError("")
                }
                }>
            </LoginForm>

            <LogOutForm
                openLogOut={openLogOut}
                setOpenLogOut={setOpenLogOut}
                setUserDetails={setUserDetails}
                onClose={() => {
                    setOpen(false);
                    setOpenSignUp(false);
                    setOpenLogOut(false);
                    setError("")
                }
                }
                onLogOut={()=>{
                    localStorage.removeItem("token");
                    setUserDetails({
                        token: null,
                        userName: null
                    })
                    setOpenLogOut(false);
                }
                }>

            </LogOutForm>
        </Box>
    );


}
