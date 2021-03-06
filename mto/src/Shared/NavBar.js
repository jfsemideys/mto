import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Icon';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles( theme => ({
    root: {
        flexGrow: 1,
    },  
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    } 
}));

export default function NavBar (props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        userName: '',
        password: '',
        companyName: props.companyName,
       
    });

    const logBtnRef = useRef(null);
    function handleCancel() {
        setOpen(false);
        setUser({
            userName: '',
            password: '',
            companyName: ''
        });
    }
    function handleClickOpen() {
        if(logBtnRef.current.innerText !== 'LOGIN'){
            props.doLogout();
        }
        else{
            setOpen(true);
        }
    }
 
    const handleLogin = () => {
        props.dologin(user.userName, user.password);
        setOpen(false);
        setUser({
            userName: '',
            password: '',
            companyName: ''
        });
    }

    const handleRegister = () => {
        console.log('register')
    }

    const handleChange = name => event => {
        setUser( {
                ...user,
                [name] : event.target.value
            } 
        );
    }

    return (
        <div className={classes.root}>
           <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                   {props.loggedUser.companyName}
                </Typography>
                <Button 
                    color="inherit"
                    onClick={handleRegister}
                    ref={logBtnRef}
                >Register</Button>
                <Button 
                    color="inherit"
                    onClick={handleClickOpen}
                    ref={logBtnRef}
                >{props.loggedUser.isLogged? 'Logout' : 'Login'}</Button>
                <div style={{verticalAlign:'center'}}>{props.loggedUser.fullName}</div>

                </Toolbar>
           </AppBar>
           <Dialog open={open}>
               <DialogTitle>Login</DialogTitle>
               <DialogContent>
                   <form>
                       <TextField
                        id="user-name"
                        value={user.userName}
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange('userName')}
                       >               
                       </TextField>
                       <br/>
                       <TextField
                        id="password"
                        value={user.password}
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange('password')}
                       >
                       </TextField>
                   </form>
               </DialogContent>
               <DialogActions>
                   <Button onClick={handleCancel}>Cancel</Button>
                   <Button onClick={handleLogin}>Login</Button>
               </DialogActions>
           </Dialog>
        </div>
    );
}