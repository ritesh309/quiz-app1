import React, { Component, Fragment } from 'react'
import Helmet from "react-helmet"
import questions from "../../questions.json";
import isEmpty from "../../utils/is-empty"
import M from "materialize-css"
import ButtonNotification from "../../assets/sounds/button-sound.wav";

import classnames from '../../../node_modules/classnames' //This is  used for disabling the next previous buttons
class Play extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            prevQuestion: {},
            answer: '',
            noOfQuestions: questions.length,
            noOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyfifty: 2,
            usedFiftyFifty: false,
            previousRandomNumbers: [],
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            time: {}
        };
        this.interval = null;
    };

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, prevQuestion } = this.state;
        this.displayQuestions( questions, currentQuestion, nextQuestion, prevQuestion );
        this.startTimer();
    }
    componentWillUnmount() {
        clearInterval( this.interval );
    }
    //Used to display hte questions on Screen 
    displayQuestions = ( questions = this.state.questions, currentQuestion, nextQuestion, prevQuestion ) => {
        let { currentQuestionIndex } = this.state;
        if ( !isEmpty( this.state.questions ) ) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            prevQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState(
                {
                    currentQuestion,
                    nextQuestion,
                    prevQuestion,
                    noOfQuestions: questions.length,
                    answer,
                    previousRandomNumbers: []
                }, () => {
                    // this.showOptions();
                    this.handleDisableButton();

                }
            );

        }

    }
    // Handling option Clicks 

    handleOptionClick = ( e ) => {
        // document.getElementById( "changeColor" ).style.background = '#000000';
        if ( e.target.innerHTML.toLowerCase() === this.state.answer.toLocaleLowerCase() ) {
            this.correctAnswer();
        }
        else {
            this.wrongAnswer();
        }
        // switch ( e.target.id ) {
        //     case 'changeColor1':
        //         document.getElementById( "changeColor1" ).style.background = 'green';
        //         break;

        //     case 'changeColor2':
        //         document.getElementById( "changeColor2" ).style.background = 'blue';
        //         break;
        //     case 'changeColor3':
        //         document.getElementById( "changeColor3" ).style.background = 'red';
        //         break;
        //     case 'changeColor4':
        //         document.getElementById( "changeColor4" ).style.background = 'black';
        //         break;
        //     default:

        // }
    }

    // playbutton sounds controls 

    playButtonSound = () => {
        setTimeout( () => {
            document.getElementById( 'button-sound' ).play();
        }, -300
        )
    };

    // handling butoon clicks 

    handleButtonClick = ( e ) => {
        switch ( e.target.id ) {
            case 'next-button':
                this.handleNextButtonClick();
                break;
            case 'previous-button':
                this.handlePreviousButtonClick();
                break;
            case 'quit-button':
                this.handleQuitButtonClick();
                break;
            default:
                break;
        }
    }

    // handling next button click 

    handleNextButtonClick = () => {
        this.playButtonSound();
        if ( this.state.nextQuestion !== undefined ) {
            this.setState( prevState => ( {
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
            } ), () => {
                this.displayQuestions( this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.prevQuestion )
            } );
        }
    };
    // handling prev button click 
    handlePreviousButtonClick = () => {
        this.playButtonSound();
        if ( this.state.prevQuestion !== undefined ) {
            this.setState( prevState => ( {
                currentQuestionIndex: prevState.currentQuestionIndex - 1,
            } ), () => {
                this.displayQuestions( this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.prevQuestion )
            } );
        }
    };

    // handling Quit button clicks 

    handleQuitButtonClick = () => {
        // this.playButtonSound().play();
        if ( window.confirm( `Are You Sure ?? Want To Exit Exam !!` ) ) {
            this.props.history.push( `/quizsummary` );
        }

    }
    // handling Correct  answers 

    correctAnswer = ( e ) => {
        M.toast( {
            html: 'Correct Answer !',
            classes: 'toast-valid',
            displayLength: 1500
        } );
        this.setState( prevState => ( {
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            // currentQuestionIndex: prevState.currentQuestionIndex + 1,
            noOfAnsweredQuestions: prevState.noOfAnsweredQuestions + 1
        } ), () => {
            if ( this.state.nextQuestion === undefined ) {
                this.endExam();
            } else {

                this.displayQuestions( this.state.questions,
                    this.state.currentQuestion,
                    this.state.nextQuestion,
                    this.state.prevQuestion,
                    this.currentQuestionIndex )
            }
        } )
    };
    // handling wrongAnswer 

    wrongAnswer = ( e ) => {
        navigator.vibrate( 1000 );
        M.toast( {
            html: 'Wrong Answer',
            classes: 'toast-invalid',
            displayLength: 1500
        } );
        this.setState( prevState => ( {
            score: prevState.score - ( 1 / 4 ),
            wrongAnswers: prevState.wrongAnswers + 1,
            // currentQuestionIndex: prevState.currentQuestionIndex + 1,
            noOfAnsweredQuestions: prevState.noOfAnsweredQuestions + 1,

        } ), () => {
            if ( this.state.nextQuestion === undefined ) {
                this.endExam();
            } else {

                this.displayQuestions( this.state.questions,
                    this.state.currentQuestion,
                    this.state.nextQuestion,
                    this.state.prevQuestion,
                    this.currentQuestionIndex )
            }
        } );
    };
    // Setting time on exams 

    startTimer = () => {
        const countDownTime = Date.now() + 8000000;
        this.interval = setInterval( () => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor( ( distance % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
            const seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 );

            if ( distance < 0 ) {
                clearInterval( this.interval );
                this.setState( {
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {

                    this.endExam();
                } );
            } else {
                this.setState( {
                    time: {
                        minutes,
                        seconds,
                    }
                } )
            }

        }, 1000 );
    }
    // handling the disable props of Next and Prev buttons 

    handleDisableButton = () => {
        if ( this.state.prevQuestion === undefined || this.state.currentQuestionIndex === 0 ) {
            this.setState( {
                previousButtonDisabled: true
            } );
        }
        else {
            this.setState( {
                previousButtonDisabled: false
            } );
        }
        if ( this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.noOfQuestions ) {
            this.setState( {
                nextButtonDisabled: true
            } );
        }
        else {
            this.setState( {
                nextButtonDisabled: false
            } );
        }
    }

    // Ending the Exams HAndlig 
    endExam = () => {
        alert( "Exam Completed !!" );
        const { state } = this;
        const examResult = {
            score: state.score,
            noOfQuestions: state.noOfQuestions,
            noOfAnsweredQuestions: state.noOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,

        };
        console.log( examResult );
        setTimeout( () => { 
            this.props.history.push( '/quizsummary',examResult );
        }, 1000 );
    }
    // MAin componentDidMount Render 
    render() {
        const { currentQuestion,
            currentQuestionIndex,
            noOfQuestions,
            time,
        } = this.state;
        return (
            <>
                <Helmet><title>PlayQuiz</title></Helmet>
                <Fragment><audio id="button-sound" src={ButtonNotification}></audio></Fragment>
                <div className="questions">
                    <h2 >Exam Mode</h2>
                    {/* handling the 20-20 and hints starts here */}
                    {/* <div className="lifeline-container">
                        <p>
                            <span className="lifeline">🧬 2</span>

                        </p>
                        <p>
                            <span className=" lifeline-icon set-center ">💡 5 <span className="lifeline"></span></span>
                        </p>
                    </div><br /> */}
                    {/* handling the no. of questions and Timer  Starts here*/}
                    <div className="lifeline-container timer-container">
                        <p>
                            <span className="question out of lifeline-icon">
                                <span id="out-questions" className="lifeline">{currentQuestionIndex + 1} out of {noOfQuestions}</span>
                            </span>
                        </p>
                        <p>
                            <span id="time-counter" className=" lifeline-icon set-center  ">{time.minutes
                            }:{time.seconds} 🕗</span>
                        </p>
                    </div>
                    {/* handling the no. of questions and Timer  Ends here*/}

                    {/* Display  the currentQuestion */}
                    <h4>{currentQuestion.question}</h4>
                    {/* sections options starts here  */}
                    <span >
                        <div className="options-container">
                            <p onClick={this.handleOptionClick} id="changeColor1" className="option">{currentQuestion.optionA}</p>
                            <p onClick={this.handleOptionClick} id="changeColor2" className="option">{currentQuestion.optionB}</p>
                        </div>
                        <div className="options-container">
                            <p onClick={this.handleOptionClick} id="changeColor3" className="option">{currentQuestion.optionC}</p>
                            <p onClick={this.handleOptionClick} id="changeColor4" className="option">{currentQuestion.optionD}</p>
                        </div>
                    </span>
                    {/* section Option Ends here  */}
                    {/* {Handling the buttons HTML } */}
                    <div className="button-container">
                        <button className={classnames( '', { 'disable': this.state.previousButtonDisabled } )}
                            id="previous-button"
                            onClick={this.handleButtonClick}
                        >
                            Previous
                        </button>
                        <button id="next-button"
                            className={classnames( '', { 'disable': this.state.nextButtonDisabled } )}

                            onClick={this.handleButtonClick}
                        >
                            Next
                        </button>
                        <button id="quit-button"
                            onClick={this.handleButtonClick}
                            className="btn btn-primary">
                            Quit
                        </button>
                    </div>
                    {/* handling buttons ends here  */}
                </div>
            </>
        )
    }
}

export default Play;