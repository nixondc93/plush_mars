import React from 'react';

class SeatPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSeats:20,
            seatsSelected: 1
        };

        this.seatChange = this.seatChange.bind(this);
    }

    seatChange() {
        this.props.seatChange(this.state.seatsSelected);
    }

    render() {
        let seatArray = [];
        for (let i = 1; i < this.state.totalSeats + 1; i ++) {
            seatArray.push(i);
        }

        return (
            <div className=" seat-picker input-group mb-3">
                <select className="custom-select" onChange={(e) => this.setState({seatsSelected: parseInt(e.target.value)}, this.seatChange)} value={this.state.seatsSelected}>
                    { seatArray.map((item) => {
                        return <option key={item} value={item}>{item}</option>;
                    })}
                </select>
            </div>
        );
    }

}

export default SeatPicker;