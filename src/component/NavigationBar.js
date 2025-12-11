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

export default function NavigationBar() {

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

    const [student, setStudent] = useState({
        studentID: '',
        firstName: '',
        lastName: '',
        password: ''
    })

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
                    <Button color="inherit" onClick={() => setOpen(true)}>Login</Button>
                </Toolbar>
            </AppBar>

            <LoginForm
                student={student}
                setStudent={setStudent}
                error={error}
                setError={setError}
                isOpen={open}
                onClose={() => setOpen(false)}>
            </LoginForm>
        </Box>
    );


}
