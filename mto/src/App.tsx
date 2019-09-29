import React, { useState, Fragment, Dispatch, SetStateAction } from 'react';
import NavBar from './Shared/NavBar';
import Grid from '@material-ui/core/Grid';
import Main from './Shared/Main';
import SideBar from './Shared/SideBar';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import SideBarItem from './Shared/SideBarItem';
import Home from './Shared/Home';
import About from './Shared/About';
import { makeStyles } from '@material-ui/styles';
import Facility from './Facilities/Facility';
import {UserModel} from './Interfaces/Interfaces';
import { GetUsers } from './Api/Users';

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

export const UserContext = React.createContext<[UserModel, Dispatch<SetStateAction<UserModel>>]>(
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
  const [user, setUser] = useState<UserModel>({
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

  const handleLogin = async (username: string, password: string) => {
    GetUsers()
       .then(usersList => {
        let loginUser: UserModel | any = usersList.find(c => c.userName === username && c.password === password);
        if(loginUser !== undefined) {
          setUser({
            userName: loginUser.userName,
            password: loginUser.password,
            id: loginUser.id,
            fullName: loginUser.fullName,
            isLogged: true,
            companyName: loginUser.companyName,
            companyId: loginUser.companyId,
            role: loginUser.role
          });
       }
    })
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
