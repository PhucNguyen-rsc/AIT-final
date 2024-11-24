import React from 'react';

const Layout = (user = null) =>{
    return (
        <>   
            <header>
                <nav>
                <span className="home-link">
                    <a href="/register">Register</a>
                </span>
                <span className="login-status">
                    <a href="/">Log In</a>
                </span>
                </nav>
            </header>
            
            <h1>Course Registering and Tracking</h1>
            
            <div className="content" >
            A site to keeping track of courses. Intend to mimic Albert features.
            </div>
        </> 
    )
}

export default Layout;