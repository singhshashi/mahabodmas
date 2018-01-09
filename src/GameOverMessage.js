import React,{ Component } from 'react';

class GameOverMessage extends Component {


    getGameOverMessage = () => {
        const gameOverMessages = [
            "The ship has sailed",
            "The climate has changed",
            "The pipe has burst",
            "The flight has left",
            "The train has left the station",
            "The milk has been spilt",
            "The ice caps have melted",
            "The stock market has crashed",
            "Your crush has gotten engaged",
            "Your phone screen has scratched",
        ];

        return gameOverMessages[Math.floor(Math.random()*gameOverMessages.length)];
    };

    render() {
        if (!this.props.show) {
            return (<div></div>);
        }

        return (
            <div>
                <div className="row">
                    <div className="col-10-sm">
                        <p className="deadMsg">
                            Game Over: {this.getGameOverMessage()}
                    </p>
                    </div>
                    <div className="col-2-sm right">
                    <p>
                        <button href="#" onClick={this.props.reset}>Reset</button>
                    </p>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-6-sm">
                        <p>Your score: {this.props.yourscore}</p>
                    </div>
                    <div className="col-6-sm right">
                        <p>Highscore: {this.props.highscore}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameOverMessage;