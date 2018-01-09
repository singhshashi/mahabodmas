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
                    <div className="col-8">
                        <p className="deadMsg">
                            {this.getGameOverMessage()}
                    </p>
                    </div>
                    <div className="col-4 right">
                        <a href="#" onClick={this.props.reset}>Reset</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <p>Your score: {this.props.yourscore}</p>
                    </div>
                    <div className="col-6 right">
                        <p>Highscore: {this.props.highscore}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameOverMessage;