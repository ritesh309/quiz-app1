import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function Quizinstructions() {
    return (
        <Fragment>
            <Helmet ><title>Quizinstructions</title></Helmet>
            <div className="container instructions">
                <h1>How to play the GAme</h1>
                <p>Make Sure your read the guide to Play the game !</p>
                <ul className="browser-default " id="main-list">
                    <li>The game has duration of 15 mins and ends as soon as the time is completed automatically so make sure us complete it before it ends</li>
                    <li>Each game consists of 15 questions</li>
                    <li>Every question has 4 options </li>
                </ul>

            </div>
        </Fragment>
    )
}

export default Quizinstructions
