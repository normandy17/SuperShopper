import React from "react"
import { Link,Route } from "react-router-dom"

function About(){
    return(
        <div>
            <h1>About</h1>
            <div>
                <Link to="/about/fullstack">Fullstack</Link>
                <br/>
                <Link to="/about/android">Android</Link>
            </div>
            <div>
                <Route exact
                path="/about/fullstack"
                render={()=><h3>Full Stack Programming</h3>} />
                <Route exact
                path="/about/android"
                render={()=><h3>Android</h3>} />
            </div>
        </div>
    )
}

export {About}