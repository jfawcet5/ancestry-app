import React, { useState } from 'react';
import logo from '../assets/test1.svg';

function HomePage() {
    return (
        <div>
            <h1>home</h1>
            <img src={logo} width="600" height="800" alt="logo"/>
        </div>
    );
}

export default HomePage;