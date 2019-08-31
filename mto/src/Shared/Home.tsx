import React from 'react';

const Home = (props:any) => {
const { to, staticContext, ...rest } = props;
    return <div
       {...rest}
        style={{padding: '0px'}}
    >
    <h2>Home</h2>
    </div>
}

export default Home;