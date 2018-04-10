import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const SeatSelector =  props =>{
    let selectedSeatCount = props.selectedSeats.length, 
        seatCost = props.selectedFlight.price_per_seat;
    
    let seatMap = props.selectedFlight.available_seats.map((seat) =>{
        return(
            <li className={`list-group-item list-group-item-action ${props.selectedSeats.includes(seat.id) ? 'selected-seat' : ''}`} key={seat.id} onClick={() => props.SeatsSelectorHandler(seat.id)}>
                Position:{seat.position}
            </li>
        );
    });

    return(
        <div className="card">
            <h4 className="card-header">Select your Seats</h4>
            <div className="card-body">
                <ul className="list-group">
                    {seatMap}
                </ul>
                <h5 className="card-title">
                  Selected Seats: {selectedSeatCount}
                </h5>
                <h5 className="card-title" >Total Cost: ${(selectedSeatCount * seatCost).toLocaleString('USD')}</h5>
                { selectedSeatCount === 0 ? <div className="card-text">You must select at least 1 seat</div> : 
                    <Link to='/flight-confirmation'>
                        <button className="btn btn-primary" onClick={props.postFlight}>Submit Your booking</button>
                    </Link>}
            </div>
        </div>
    );
    
};

export default SeatSelector;