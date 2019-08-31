import React, { useState, Fragment } from 'react';
import NavBar from './Shared/NavBar';
import users from './Data/Users.js';
import Grid from '@material-ui/core/Grid';
import Main from './Shared/Main';
import SideBar from './Shared/SideBar';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import SideBarItem from './Shared/SideBarItem';
import Home from './Shared/Home';
import About from './Shared/About';
import { UserContext } from './Shared/UserContext';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    disabled:{
      cursor:'notAllowed',
      cursorEvents: 'none',
      opacity: '0.5'
    }
  }
);


function App() {
    const [user, setUser] = useState({
      userName: '',
      password: '',
      userId: 0,
      fullName: '',
      isLogged: false,
      companyName: '',
      companyId: 0
  });

  const classes = useStyles();

  const handleLogin = (username, password) => {
    let loginUser = users.find(c => c.userName === username && c.password === password);

    if(loginUser !== null){
      setUser({
        ...user,
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
        userId: 0,
        fullName: '',
        isLogged: false,
        companyName: '',
        companyId: 0
      });
  }
  return (
    <Router>
      <Fragment>
        <NavBar dologin={handleLogin} doLogout={handleLogout} loggedUser={user}></NavBar>
        <Grid container>
        <UserContext.Provider value={user}>
          <Grid item md={3}>
            <SideBar>
              <SideBarItem>
                <Link to={'/home'}>Home</Link>
              </SideBarItem>
              <SideBarItem>
                <Link to={'/facilities'} className={!user.isLogged ? classes.disabled: null}  >Facilities</Link>
              </SideBarItem>
              <SideBarItem>
                <Link to={'/about'} >About</Link>
              </SideBarItem>
            </SideBar>
          </Grid>
          <Grid item md={9}>
            <Main>
              
                <Route path={'/home'} component={Home} />
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
