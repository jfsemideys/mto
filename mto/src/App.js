import React, { useState } from 'react';
import NavBar from './Shared/NavBar';
import users from './Data/Users.js';

function App() {
    const [user, setUser] = useState({
      userName: '',
      password: '',
      userId: 0,
      fullName: '',
      companyName: '',
      companyId: 0
  });

  const handleLogin = (username, password) => {
    console.log('username = ', username)
    console.log('password ', password)
    let loginUser = users.find(c => c.userName === username && c.password === password);
    if(user !== null){
      //console.log(user)
      setUser({
        ...user,
        companyName : loginUser.companyName
      });
      console.log('uu', user)
    }
  }
  return (
   <NavBar dologin={handleLogin} company={user.companyName}></NavBar>
   )
}
export default App;
