
import './App.css';
import './styles/styles.scss'
import Home from "./components/Home"
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Quizinstructions from "./components/Quiz/Quizinstructions"
import QuizSummary from "./components/Quiz/QuizSummary"
import Play from "./components/Quiz/Play"


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/play" component={Play} /> */}
      <Route exact path="/play" component={Play} />
      <Route exact path="/quizsummary" component={QuizSummary} />

    </Router>
  );
}

export default App;
