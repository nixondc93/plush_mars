import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';


import DatePicker from './DatePicker';
import SeatPicker from './SeatPicker';
import FlightSelector from './FlightSelector';
import SeatSelector from './SeatSelector';
import FlightConfirmation from './FlightConfirmation';
import DateSelector from './DateSelector';
import OnError from './OnError';

import styles from './css/plushmars.scss';

const apiPostUrl = 'http://ec2-54-190-51-40.us-west-2.compute.amazonaws.com/flights/select/',
    apiUrl = 'http://ec2-54-190-51-40.us-west-2.compute.amazonaws.com/flights/search/?';


class PlushMars extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            departureDate: {
                day: 1,
                month: 1,
                year: 2018,
            },
            returnDate: {
                day: 1,
                month: 1,
                year: 2018,
            },
            numberOfSeats: 1,
            flightFound: false,
            months: [1,2,3,4,5,6,7,8,9,10,11,12],
            days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            year: [2018, 2019, 2020, 2021, 2022],
            seats: 20,
            selectedSeats: JSON.parse(localStorage.getItem('selectedSeats')) || [],
            seatsFound: false,
            flightData: JSON.parse(localStorage.getItem('flightData')) || null,
            flightConfirmationData: JSON.parse(localStorage.getItem('flightConfirmationData')) || null,
            selectedFlightData: JSON.parse(localStorage.getItem('selectedFlightData')) || null,
            flightBooked: false,
            errorOnGetFlights: null,
            errorOnPostFlight: false,
            dateError: true
        };

        this.submitSearch = this.submitSearch.bind(this);
        this.dateHandler = this.dateHandler.bind(this);
        this.seatChange = this.seatChange.bind(this);
        this.flightSelectorHandler = this.flightSelectorHandler.bind(this);
        this.SeatsSelectorHandler = this.SeatsSelectorHandler.bind(this);
        this.postFlight = this.postFlight.bind(this);
        this.ResetFlightData = this.ResetFlightData.bind(this);
    }

    ResetFlightData(){
        this.setState({
            flightData: null,
            selectedFlightData: null,
            flightConfirmationData: null,
            departureDate: {
                day: 1,
                month: 1,
                year: 2018,
            },
            returnDate: {
                day: 1,
                month: 1,
                year: 2018,
            },
            numberOfSeats: 1,
            selectedSeats: [],
            dateError: true
        });
        localStorage.clear();
    }

    submitSearch() {
        let seats = 'number_seats=' + this.state.numberOfSeats;
        let departureDateObject = this.state.departureDate;
        let returnDateObject = this.state.returnDate;
        let departureMonth = departureDateObject.month.toString().length > 1 ? departureDateObject.month   : '0' + departureDateObject.month; 
        let departureDay =  departureDateObject.day.toString().length > 1 ? departureDateObject.day : '0' + departureDateObject.day;
        returnDateObject.month = returnDateObject.month.toString().length > 1 ? returnDateObject.month : '0' + returnDateObject.month;
        returnDateObject.day = returnDateObject.day.toString().length > 1 ? returnDateObject.day : '0' + returnDateObject.day;
        let departureYear = departureDateObject.year;

        let departureDate = 'depart_date=' + departureYear + '-' + departureMonth + '-' + departureDay;
        let returnDate = 'return_date=' + returnDateObject.year + '-' + returnDateObject.month + '-' + returnDateObject.day; 

        let queryString = `${apiUrl}${departureDate}&${returnDate}&${seats}`;

        const request = new Request(queryString, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
  
        fetch(request)
            .then(data=>data.json())
            .then(jsonData =>{
                localStorage.setItem('flightData', JSON.stringify(jsonData));
                localStorage.setItem('errorOnGetFlights', false);
                this.setState({flightData: jsonData, errorOnGetFlights: false});
            }, error =>{
                this.setState({errorOnGetFlights: true});
                console.log(error);
            });
    }

    dateHandler(dateObject, arrivalOrDeparture) {
        let newdate = Number(new Date(`${dateObject.year}-${dateObject.month}-${dateObject.day}`).getTime()),
            returnDate = Number(new Date(`${this.state.returnDate.year}-${this.state.returnDate.month}-${this.state.returnDate.day}`).getTime()),
            departDate = Number(new Date(`${this.state.departureDate.year}-${this.state.departureDate.month}-${this.state.departureDate.day}`).getTime());

        if (arrivalOrDeparture == 'departure') {
            if(newdate <= returnDate){
                this.setState({dateError: true});
            }else{
                this.setState({dateError: false});
            }
            this.setState({departureDate: dateObject});  
        } else {
            if(newdate >= departDate){
                this.setState({dateError: true});
            }else{
                this.setState({dateError: false});
            }
            this.setState({returnDate: dateObject});
        }
    }

    // Sets State When a Flight is Selected from the returned list
    flightSelectorHandler(flightObj){
        localStorage.setItem('selectedFlightData', JSON.stringify(flightObj));
        this.setState({
            selectedFlightData: flightObj,
            seatsFound: true,
            flightFound: false,
            selectedSeats: []
        });
    }

    SeatsSelectorHandler(selectedSeatId){
        let selectedSeats = [...this.state.selectedSeats];
      
        if(!selectedSeats.includes(selectedSeatId)){
            selectedSeats.push(selectedSeatId);
        }else{
            selectedSeats = selectedSeats.filter((ele) => ele !== selectedSeatId);
        }
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
        this.setState({selectedSeats});
    }

    // Posts Flight Data to API
    postFlight(){
        const postRequest = new Request(apiPostUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                flight_id: this.state.selectedFlightData.id,
                seats: this.state.selectedSeats
            })
        });

        fetch(postRequest)
            .then(res => res.json())
            .then((json) => {
                localStorage.setItem('flightConfirmationData', JSON.stringify(json));
                this.setState({flightConfirmationData: json, errorOnPostFlight: false});
            }, (error) =>{
                console.log(error);
                this.setState({errorOnPostFlight: true});
            });
    }

    seatChange(numberOfSeats) {
        this.setState({numberOfSeats: numberOfSeats});
    }

    render() {
        // let flightFound = this.state.flightFound;
        // let seatsFound = this.state.seatsFound;
        let selectedSeats = this.state.selectedSeats;
        // let flightBooked = this.state.flightBooked;
        let dateError = this.state.dateError;
        let months = this.state.months;
        let days = this.state.days;
        let year = this.state.year;
        let flightSelectorHandler = this.flightSelectorHandler;
        let SeatsSelectorHandler = this.SeatsSelectorHandler;
        let selectedFlightData = this.state.selectedFlightData; 
        let flightData = this.state.flightData;
        let flightConfirmationData = this.state.flightConfirmationData;
        let errorOnPostFlight = this.state.errorOnPostFlight; 
        let errorOnGetFlights = this.state.errorOnGetFlights;
        
        return (
            <div className="wrapper">
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">PlushMars</span>
                </nav>
                <Router>
                    <div  className="container">
                        <Switch>
                            <Route exact path='/' render={() => <DateSelector days={days} months={months} year={year} seatChange={this.seatChange} submitSearch={this.submitSearch} dateHandler={this.dateHandler} dateError={dateError}/>}/>
                            <Route path='/flight-confirmation' render={() => errorOnPostFlight ?  <Redirect to='/error'/> : <FlightConfirmation flightConfirmationData={flightConfirmationData} selectedFlightData={selectedFlightData} selectedSeats={selectedSeats} ResetFlightData={this.ResetFlightData} errorOnPostFlight={errorOnPostFlight}/>}/>
                            <Route path='/seat-selector' render={() => <SeatSelector postFlight={this.postFlight} SeatsSelectorHandler={SeatsSelectorHandler} selectedFlight={selectedFlightData} selectedSeats={selectedSeats}/>}/>
                            <Route path='/flight-selector' render={() => errorOnGetFlights ?  <Redirect to='/error'/> : <FlightSelector flightData={flightData} flightSelectorHandler={flightSelectorHandler}/>}/>
                            <Route path='/error' render={()=> <OnError ResetFlightData={this.ResetFlightData}/>}/>
                            <Route render={()=> <OnError ResetFlightData={this.ResetFlightData}/>}/>
                        </Switch>
                    </div>
                </Router>
                <footer className="footer">
                    <div className="container">Plush Mars 2018</div>
                </footer>
            </div>
        );
    }
}


ReactDOM.render(
    <PlushMars />,
    document.querySelector('.react-wrapper'));

export default PlushMars;