import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameOverMessage from './GameOverMessage';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class App extends Component {
  state = {
    questionString: "", 
    levelCorrectAnswerCount: 0, 
    totalCorrectAnswerCount: 0,
    level: 1, 
    timeRemaining: 0, 
    showGameOverMessage: false, 
    score: 0, 
    highscore: 0, 
    yourscore:0};
  operators = ["+","-"];
  timerHandle = null;

  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  getRandom = (array) => {
    var randomIndex = this.getRandomIntInclusive(0, array.length - 1);
    return array[randomIndex];
  }

  
  generateQuestion = () => {
    let rangeUpperLimit = 10*this.state.level;
    let rangeLowerLimit = 0;
    let numberOfOperators = 3;
    let numbers = [];
    for (var i = 0; i < numberOfOperators; i++) {
      var generatedNumber = this.getRandomIntInclusive(rangeLowerLimit,rangeUpperLimit);
      numbers.push(generatedNumber);
    }

    let questionString = "";
    numbers.forEach((value, index) => {
      questionString += value + this.getRandom(this.operators);
    });

    questionString = questionString.substr(0, questionString.length - 1);
    return questionString;
  };

  componentDidMount() {
    const questionString = this.generateQuestion();
    this.setState({questionString: questionString});
    let answerElement = document.getElementById('txtAnswer');
    answerElement.focus();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timeRemaining === 0 && prevState.timeRemaining > 0) {
      this.gameOver();     
    }
  }

  restart = () => {    
    let answerElement = document.getElementById('txtAnswer');
    answerElement.value = '';    
    this.setState({timeRemaining: 0, levelCorrectAnswerCount: 0, totalCorrectAnswerCount:0, score: 0, level: 1, showGameOverMessage: false });
    answerElement.focus();
  }

  gameOver = () => {
    clearInterval(this.timerHandle);
    const highscore = this.state.score > this.state.highscore ? this.state.score : this.state.highscore;   
    const score = this.state.score; 
    this.setState({showGameOverMessage: true, yourscore: score, highscore: highscore });
  }

  handleAnswerKeyPress = (evt) => {    
    if (evt.charCode === 13 && !this.state.showGameOverMessage) {      
      var userAnswer = parseInt(evt.target.value);
      const actualAnswer = eval(this.state.questionString);      
      let questionString = this.generateQuestion();
      let answerElement = evt.target;      
      if (userAnswer === actualAnswer) {
        clearInterval(this.timerHandle);
        let updatedCorrectAnswerCount = this.state.levelCorrectAnswerCount + 1;
        let level = this.state.level;
        let updatedScore = this.state.level*5 + this.state.score + this.state.levelCorrectAnswerCount;        
        if (updatedCorrectAnswerCount === 7) {
          updatedCorrectAnswerCount = 0;
          level = level + 1;
        }
        let totalCorrectAnswerCount = this.state.levelCorrectAnswerCount === 0 && this.state.level === 1 ? updatedCorrectAnswerCount : this.state.totalCorrectAnswerCount + 1;
        
        this.setState({ levelCorrectAnswerCount: updatedCorrectAnswerCount, questionString: questionString, 
                        timeRemaining: 7, showGameOverMessage: false, level: level, score: updatedScore, totalCorrectAnswerCount: totalCorrectAnswerCount});    
        this.timerHandle = setInterval(() => { this.setState({timeRemaining: this.state.timeRemaining - 1})}, 1000);
        answerElement.value = "";
      } else {
        this.gameOver();
      }
      
    }
  }

  render() {
    let progressToFocusPercent = Math.floor(this.state.totalCorrectAnswerCount*100/25);   


    return (
      <div className="App">
        <div className="trici-link"><a href="https://www.gettrici.com">Go to gettrici.com</a></div>         
        <header className="App-header">           
          <h1 className="App-title">MAHABODMAS</h1>          
          <h5> A Mental Math game to get your mind to focus</h5>
        </header>
        <div className="App-intro">
          <div className="row">
            <div className="col-3-sm">
              <p>Level: {this.state.level}</p>
            </div>
            <div className="col-6-sm center">
              <p>Correct:  {this.state.levelCorrectAnswerCount}/7</p>  
            </div>            
            <div className="col-3-sm right">
              <p>Score: {this.state.score}</p>
            </div>
          </div>
          <div className="row">
            <h1 className="center">{this.state.questionString}</h1>          
          </div> 
          <div className="row center">
            <input type="text" id="txtAnswer" onKeyPress={this.handleAnswerKeyPress} />          
          </div> 
          <br />
          <div className="row">
            <div className="col-2-sm">
              <p>Time:  {this.state.timeRemaining}</p>
            </div>                          
          </div> 
          <div className="row">
            <div className="col-12-sm">
              <p>Your Focus Percentage:</p>            
              <Progress percent={progressToFocusPercent} />             
            </div>
          </div>

          <GameOverMessage show={this.state.showGameOverMessage} highscore={this.state.highscore} yourscore={this.state.yourscore} reset={this.restart}/>                      
        </div>
      </div>
    );
  }
}

export default App;
