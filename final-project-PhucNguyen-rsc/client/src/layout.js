import React from 'react';

const Layout = (user = null) =>{
    return (
        <>   
            <header>
                <nav>
                <span class="home-link">
                    <a href="/register">Register</a>
                </span>
                </nav>
            </header>
            
            <h1>Course Registering and Tracking</h1>
            
            <div class="content" >
            A site to keeping track of courses. Intend to mimic Albert features.
            </div>
        </> 
    )
}

export default Layout;