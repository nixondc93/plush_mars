import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import DatePicker from './DatePicker';
import SeatPicker from './SeatPicker';

const DateSelector = (props) => {
    let dateErrorMessage = (
        <div className="alert alert-danger" role="alert">
            The Departure Date Must be Before the Return Date
        </div>);

    return (
        <div className="card date-selector">
            <h3 className="card-header">Select Your Flight Details</h3>
            <div className='flight-finder card-body'>
                <div className="card-title">Select Departure Date</div>
                <DatePicker
                    dateHandler = {props.dateHandler}
                    months={props.months}
                    days={props.days}
                    year={props.year}
                    arrivalOrDeparture='arrival'/>
                <div className="card-title" >Select Return Date</div>
                <DatePicker 
                    dateHandler = {props.dateHandler}
                    months={props.months}
                    days={props.days}
                    year={props.year}
                    arrivalOrDeparture='departure'/>
                {props.dateError && dateErrorMessage}
                <div className="card-title" >Select Number of Seats</div>
                <SeatPicker seatChange={props.seatChange}/>
                <div className={`${props.dateError ? 'd-none': ''}`}>
                    <Link to='/flight-selector'>
                        <button className="btn btn-primary" onClick={props.submitSearch}>Find flights</button>
                    </Link>
                </div>
            </div>
        </div>
    );

};


export default DateSelector; 