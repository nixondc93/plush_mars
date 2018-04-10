
## Components

#### `App.jsx`
Root component. Handles most of the logic that is passed down to child components, and handles routing using react-router. App.jx also reads localStorage to maintain state after a refresh. 

#### `DatePicker.jsx/SeatPicker.jsx`
Renders the drops downs to select the depart and return date as well as the number of seats

#### `DateSelector.jsx`
Displays the DatePicker and the SeatPicker components. Is passed the date validation function, dateError through props. 

#### `FlightSelector.jsx`
Diplays the flights returned from the API get request. A user may click on a flight to select it. This component also parses the dates returned to make them more readable

#### `SeatSelector.jsx`
Renders the list of Seats from the Flight that was selected by the user. Calculates the total price from the number to selected seats and price per seat. 

#### `OnError.jsx`
Displays when an error occurs in an API request. Also gives the option to naviagate back to the the DatePicker to try and book a flight again. 

#### `FlightConfirmation.jsx`
Component which displays the flight confirmation, which is the response from posting the flight. Also displays a button so users may navigate to the beginning and book another flight. 

### Note:

I didn't check to ensure the dates are not in the past because the API returned responses successfully regardless.
I did check to ensure that the depart date is before the return date. 
