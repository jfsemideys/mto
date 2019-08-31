import React from 'react';

const About = (props:any) => {

    const { to, staticContext, ...rest } = props;

    return <div
        {...rest}
        style={{padding: '0px'}}
    >
        <h2>About</h2>
    </div>
}

export default About;