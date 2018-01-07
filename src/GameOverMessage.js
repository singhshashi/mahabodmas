import React,{ Component } from 'react';

class GameOverMessage extends Component {

    render() {
        if (!this.props.show) {
            return (<div></div>);
        }

        return (
            <div>
                <div className="row">
                    <div className="col-5">
                        <p className="deadMsg">
                            The ship has sailed!
                    </p>
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