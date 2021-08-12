import React from 'react'
import Helmet from 'react-helmet'
import { NavLink } from 'react-router-dom'
// import { mdiClipboardClock } from '@mdi/js';
const bg = "https://images.unsplash.com/photo-1628602813485-4e8b09442e98?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60";

function Home() {
    return (
        <><Helmet><title>Quiz-App</title></Helmet>
            <div id="home">
                <section className="">
                    <div className="">
                        <span className="mdi mdi-cube-outline mdi-48px "><mdiClipboardClock /></span>
                    </div>
                    <h1>Quiz App</h1>
                    <div className="play-button-container">
                        <ul className="play-button" type="none">
                            <li ><NavLink to="/play" id="start-exam">!!  Start Exam !!</NavLink></li>
                        </ul>
                    </div>
                    {/* <div className="auth-container">
                        <NavLink to="/login" className="auth-buttons" id="login-button">Login</NavLink>
                        <NavLink to="/register" className="auth-buttons" id="register-button">Register</NavLink>
                    </div> */}
                </section>
            </div>
        </>
    )
}

export default Home
