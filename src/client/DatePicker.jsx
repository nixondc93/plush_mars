import React from 'react';

class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            months: props.months,
            days: props.days,
            year: props.year,
            selectedMonth: 1,
            selectedDay: 1,
            selectedYear: 2018,
            arrivalOrDeparture: props.arrivalOrDeparture
        };

        this.dateChanged = this.dateChanged.bind(this);
    }

    dateChanged() {
        let date = {
            month: this.state.selectedMonth,
            day: this.state.selectedDay,
            year: this.state.selectedYear
        };
        this.props.dateHandler(date, this.state.arrivalOrDeparture);
    }

    render() {
        let months = this.state.months;
        let days = this.state.days;
        let year = this.state.year; 

        return (
            <div className="mx-auto date-picker input-group mb-3" onChange={this.dateChanged}>
                <label className="input-group-text" htmlFor="inputGroupSelect01">Month</label>
                <select className="custom-select" id="inputGroupSelect01" onChange={(e) => this.setState({selectedMonth:parseInt(e.target.value)}, this.dateChanged)} name="month" value={this.state.selectedMonth}>
                    { months.map((item) => {
                        return <option  key={item} value={item}>{item}</option>;
                    })}
                </select>
                <label className="input-group-text" htmlFor="inputGroupSelect02">Day</label>
                <select className="custom-select" id="inputGroupSelect02" onChange={(e) => this.setState({selectedDay:parseInt(e.target.value)}, this.dateChanged)} name="day" value={this.state.selectedDay}>
                    { days.map((item) => {
                        return <option key={item} value={item}>{item}</option>;
                    })}
                </select>
                <label className="input-group-text" htmlFor="inputGroupSelect03">Year</label>
                <select className="custom-select" id="inputGroupSelect03" onChange={(e) => this.setState({selectedYear:parseInt(e.target.value)}, this.dateChanged)} name="year" value={this.state.selectedYear}>
                    { year.map((item) => {
                        return <option key={item} value={item}>{item}</option>;
                    })}
                </select>
            </div>
        );
    }

}

export default DatePicker;