import React, { useState, Fragment, Dispatch, SetStateAction, Component } from 'react';
import NavBar from './Shared/NavBar';
import users from './Data/Users.js';
import Grid from '@material-ui/core/Grid';
import Main from './Shared/Main';
import SideBar from './Shared/SideBar';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import SideBarItem from './Shared/SideBarItem';
import Home from './Shared/Home';
import About from './Shared/About';
import { createContext } from 'react';


import { makeStyles } from '@material-ui/styles';
import Facility from './Facilities/Facility';

const useStyles = makeStyles(theme => ({
  disabled: {
    cursor: 'notAllowed',
    cursorEvents: 'none',
    pointerEvents: 'none',
    opacity: 0.5
  },
  normal:{

  }
}));

export interface IUser{
     userName: string,
      password: string,
      id: number,
      fullName: string,
      isLogged: boolean,
      companyName: string,
      companyId: number,
      role: string
}

export const UserContext = React.createContext<[IUser, Dispatch<SetStateAction<IUser>>]>(
  [
    {
      userName: '',
      password:  '',
      id: 0,
      fullName:  '',
      isLogged: false,
      companyName:  '',
      companyId: 0,
      role:  '',
  },
  () => {}
  ]
);


function App() {
    const [user, setUser] = useState<IUser>({
      userName: '',
      password: '',
      id: 0,
      fullName: '',
      isLogged: false,
      companyName: '',
      companyId: 0,
      role: ''
      
  });

  const classes = useStyles();

  const handleLogin = (username: string, password: string) => {
    let loginUser: IUser | undefined = users.find(c => c.userName === username && c.password === password);

    if(loginUser !== undefined){
      setUser({
        ...user,
         id: loginUser.id,
         companyId: loginUser.companyId,
         role: loginUser.role,
         userName: loginUser.userName,
         isLogged: true,
         companyName: loginUser.companyName,
         fullName: loginUser.fullName
      });
      console.log('handleLogin', user)
    }  
  }

  const handleLogout = () => {
       setUser({
        userName: '',
        password: '',
        id: 0,
        fullName: '',
        isLogged: false,
        companyName: '',
        companyId: 0,
        role: ''
      });
  }

 
  

  return (
    <Router>
      <Fragment>
        <NavBar dologin={handleLogin} doLogout={handleLogout} loggedUser={user}></NavBar>
        <Grid container>
        <UserContext.Provider value={[user, setUser]} >
          <Grid item md={2}>
            <SideBar>
              <SideBarItem>
                <Link to={'/home'}>Home</Link>
              </SideBarItem>
              <SideBarItem>
                <Link to={'/facilities'} className={!user.isLogged ? classes.disabled: classes.normal}  >Facilities</Link>
              </SideBarItem>
              <SideBarItem>
                <Link to={'/about'} >About</Link>
              </SideBarItem>
            </SideBar>
          </Grid>
          <Grid item md={10}>
            <Main>
                <Route path={'/home'} component={Home} />
                <Route path={'/facilities'} component={Facility} />
                <Route path={'/about'} component={About} />        
            </Main>
          </Grid>
          </UserContext.Provider>
        </Grid>       
    </Fragment>
  </Router>
   )
}
export default App;
