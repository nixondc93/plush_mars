import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const OnError = props => {

    return (
        <div className="card">
            <div className="card-header">
                <h3>Oh No! It looks like an Error Occurred</h3>
            </div>
            <div className="card-body">
                <h4 className="card-title">We're sorry For the inconvience</h4>
                <div className="card-text">
                    Please try to Book your Flight again. 
                </div>
                <Link to='/' >
                    <button className="btn btn-primary" onClick={props.ResetFlightData}>Book Your Voyage</button>
                </Link>
            </div>
        </div>
    );
};

export default OnError; 