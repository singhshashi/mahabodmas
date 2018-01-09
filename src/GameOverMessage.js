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

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.show && this.props.show) {            
                window.twttr.widgets.load();            
        }
    }

    render() {
        if (!this.props.show) {
            return (<div></div>);
        }

        const tweetMessage = "Beat my score of " + this.props.highscore + " in a simple mental math game at"

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
                <div className="row">
                    <div className="sol-s12-sm right">
                        <p>
                            <a className="twitter-share-button"
                                href="https://twitter.com/intent/tweet"
                                data-size="large"
                                data-text={tweetMessage}
                                data-via="gettrici"
                                data-hashtags="mahabodmas"
                                >                                
                                Tweet</a>
                        </p>                        
                    </div>
                </div>
            </div>
        )
    }
}

export default GameOverMessage;