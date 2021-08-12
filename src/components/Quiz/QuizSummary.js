import React, { Component, Fragment } from 'react'
import Helmet from "react-helmet"
// import mdi from "../../../node_modules/@mdi/react"
import "../../../node_modules/@mdi/react"
import { NavLink } from 'react-router-dom'
class QuizSummary extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            score: 0,
            noOfQuestions: 0,
            noOfAnsweredQuestion: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        };
    }

    componentDidMount() {
        const { state, score } = this.props.location;
        this.setState( {
            score: ( state.score / state.noOfQuestions ) * 100,
            noOfQuestions: state.noOfQuestions,
            noOfAnsweredQuestions: state.noOfAnsweredQuestion,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,

        } )
    }
    render() {

        console.log( this.props.location.state )
        const { state, score } = this.props.location;
        let stats, remark;

        if ( score <= 30 ) {
            remark = "You Need More Practice !"
        }
        else if ( score > 30 && score <= 50 ) {
            remark = "You Did Well ! Practice More !"
        }
        else if ( score > 50 && score <= 70 ) {
            remark = "You Did Well ! Good Job !"
        }
        else if ( score > 70 && score < 90 ) {
            remark = "WonderFul ! You Nailed it"
        }
        else if ( score >= 90 && score < 99 ) {
            remark = "Owesome ! Congrats,you are genious "
        }
        else {
            remark = "Practice More"
        }

        if ( state !== undefined ) {
            stats = ( <Fragment>
                <div>
                    <span className="mdi mdi-check-circle-outline success-icon">☑️</span>
                </div>
                <h1>Exam has ended !</h1>
                <div className="container">
                    <h4>{remark}</h4>
                    <h2>Your Score : {this.state.score.toFixed()}&#37;</h2>
                    <span className="stat left">Total Number of Questions:</span>
                    <span className="right">{this.state.noOfQuestions}</span><br />

                    <span className="stat left">Total Number of Answered Questions:</span>
                    <span className="right">{this.state.noOfAnsweredQuestions}</span><br />

                    <span className="stat left">Total Number Corrrect Answers:</span>
                    <span className="right">{this.state.correctAnswers}</span><br />

                    <span className="stat left">Total Number of Wrong Answers:</span>
                    <span className="right">{this.state.wrongAnswers}</span><br />
                </div>

                <section className="">
                    <ul>
                        <li>
                            <NavLink to="/" >Back ToHome</NavLink>
                        </li>
                    </ul>
                </section>

            </Fragment> )
        }
        else {
            stats = ( <Fragment>
                <section className="">
                    <h1 no-stats>No Statistics Available</h1>
                    <ul>
                        <li>
                            <NavLink to="/" >Back Home</NavLink>
                        </li>
                    </ul>
                </section>
            </Fragment> )
        }

        return ( <Fragment>
            <Helmet><title>Exam Results</title></Helmet>
            <h1>{stats}</h1>
            <h1>{remark}</h1>
        </Fragment> )
    }




}

export default QuizSummary
