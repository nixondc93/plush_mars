import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const FlightConfirmation = props => {
    if(!props.flightConfirmationData || props.flightConfirmationData.craft_image){
        return (
            <h3>Loading Flight Details...</h3>
        );
    }
    
    let depart_date = new Date(props.selectedFlightData.depart_date),
        return_date = new Date(props.selectedFlightData.return_date),
        depart_date_string = `${depart_date.getMonth()}-${depart_date.getDate()}-${depart_date.getFullYear()}, ${depart_date.getHours()}:${depart_date.getMinutes()} `,
        return_date_string = `${return_date.getMonth()}-${return_date.getDate()}-${return_date.getFullYear()}, ${return_date.getHours()}:${return_date.getMinutes()}`;
    

    return (
        <div className="card">
            <div className="card-header">
                <h3 >Your Voyage is Booked!</h3>
                <h4>{props.flightConfirmationData.confirmation_message}</h4>
            </div>
            <div className="card-body">
                <h4 className="card-title">Your Flight Details:</h4>
                <div className="card-text">
                    <div>Confirmation ID: {props.flightConfirmationData.confirmation_id}</div>
                    <div>
                        <div>
                    Craft Name: {props.selectedFlightData.craft_name}
                        </div>
                        <div>
                            <img src={props.selectedFlightData.craft_image}/>
                        </div>
                    </div>
                    <div>Departure Date: {depart_date_string}</div>
                    <div>Return Date: {return_date_string}</div>
                    <div>Seats Purchased: {props.selectedSeats.length}</div>
                    <div>Total Cost: ${(props.selectedSeats.length * props.selectedFlightData.price_per_seat).toLocaleString('USD')}</div>
                </div>
                <Link to='/' >
                    <button className="btn btn-primary" onClick={props.ResetFlightData}>Book Another Voyage</button>
                </Link>
            </div>
        </div>
    );
};

export default FlightConfirmation; 