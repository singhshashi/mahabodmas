import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameOverMessage from './GameOverMessage';

class App extends Component {
  state = {questionString: "", correctAnswerCount: 0, level: 1, timeRemaining: 0, showGameOverMessage: false, score: 0, highscore: 0, yourscore:0};
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
      this.resetScore();     
    }
  }

  resetScore = () => {
    clearInterval(this.timerHandle);
    const highscore = this.state.score > this.state.highscore ? this.state.score : this.state.highscore;   
    const score = this.state.score; 
    this.setState({timeRemaining: 0, correctAnswerCount: 0, showGameOverMessage: true, score: 0, yourscore: score, highscore: highscore, level: 1 });
  }

  handleAnswerKeyPress = (evt) => {    
    if (evt.charCode === 13) {      
      var userAnswer = parseInt(evt.target.value);
      const actualAnswer = eval(this.state.questionString);      
      let questionString = this.generateQuestion();
      let answerElement = evt.target;      
      if (userAnswer === actualAnswer) {
        clearInterval(this.timerHandle);
        let updatedCorrectAnswerCount = this.state.correctAnswerCount + 1;
        let level = this.state.level;
        let updatedScore = this.state.level*5 + this.state.score + this.state.correctAnswerCount;        
        if (updatedCorrectAnswerCount === 7) {
          updatedCorrectAnswerCount = 0;
          level = level + 1;
        }
        this.setState({ correctAnswerCount: updatedCorrectAnswerCount, questionString: questionString, 
                        timeRemaining: 7, showGameOverMessage: false, level: level, score: updatedScore });    
        this.timerHandle = setInterval(() => { this.setState({timeRemaining: this.state.timeRemaining - 1})}, 1000);
      } else {
        this.resetScore();
      }
      answerElement.value = "";
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">          
          <h1 className="App-title">MAHABODMAS</h1>          
          <h5> Are you the WhizKid of mental math?</h5>
        </header>
        <div className="App-intro">
          <div className="row">
            <div className="col-3">
              <p>Level: {this.state.level}</p>
            </div>
            <div className="col-6 center">
              <p>Correct:  {this.state.correctAnswerCount}/7</p>  
            </div>            
            <div className="col-3 right">
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
            <div className="col-6">
              <p>Time:  {this.state.timeRemaining}</p>
            </div>              
          </div>                     
          <GameOverMessage show={this.state.showGameOverMessage} highscore={this.state.highscore} yourscore={this.state.yourscore} />                      
        </div>
      </div>
    );
  }
}

export default App;
