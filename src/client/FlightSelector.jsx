import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const FlightSelector = props => {
    if(!props.flightData){
        return(
            <li className="list-group-item">Loading Flights...</li>
        );
    }

    let flightList = props.flightData.map((flight) =>{
        let depart_date = new Date(flight.depart_date),
            return_date = new Date(flight.return_date),
            depart_date_string = `${depart_date.getMonth()}-${depart_date.getDate()}-${depart_date.getFullYear()}, ${depart_date.getHours()}:${depart_date.getMinutes()} `,
            return_date_string = `${return_date.getMonth()}-${return_date.getDate()}-${return_date.getFullYear()}, ${return_date.getHours()}:${return_date.getMinutes()}`;
            
        return (
            <li className="media" key={flight.id} onClick={() => props.flightSelectorHandler(flight)}>
                <img className="mr-3" width="100px" height="100px" src={flight.craft_image}/>
                <div className="media-body">
                    <h5 className="mt-0 mb-1">Craft Name: {flight.craft_name}</h5>
                    <div>
                      Departure Date: {depart_date_string}
                    </div>
                    <div>
                      Return Date: {return_date_string}
                    </div>
                    <div>
                      Price Per Seat: ${flight.price_per_seat.toLocaleString('USD')}
                    </div>
                </div>
            </li>
        );
    });

    return (
        <div className="card flight-selector">
            <h3 className="card-header">Select Your Flight</h3>
            <div className="card-body">
                <ul className="list-unstyled">
                    <Link to='/seat-selector'>
                        {flightList}  
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default FlightSelector;