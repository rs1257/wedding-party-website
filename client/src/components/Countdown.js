import React from 'react';
import './Countdown.scss';
import axios from 'axios';

export default class Countdown extends React.Component {
  constructor() { //we still need to be able to pass in the values for this
    super();
    this.state = { time: {}, seconds: 90 , date: Date.now()};
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.calculateCountdownValues = this.calculateCountdownValues.bind(this);
  }

  render() {
    return (
      <div className='countdown'>
        <ul>
          <li><span id="days">{this.state.time.days}</span>days</li>
          <li><span id="hours">{this.state.time.hours}</span>Hours</li>
          <li><span id="minutes">{this.state.time.minutes}</span>Minutes</li>
          <li><span id="seconds">{this.state.time.seconds}</span>Seconds</li>
        </ul>
      </div>
    );
  }

  componentDidMount() {
    axios
      .post('/api/settings/get', { name: 'WeddingDateTime' })
      .then((res) => {
        //console.log(res.data);
        if (res.data) {
          this.setState({ date: res.data.value });
          this.calculateCountdownValues();
        }
        this.startTimer();
      })
      .catch((err) => console.log(err));
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.calculateCountdownValues, 1000);
    }
  }

  calculateCountdownValues() {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    //let countDown = new Date('Oct 25, 2020 12:00:00').getTime();
    let countDown = new Date(this.state.date).getTime();

    let now = new Date().getTime(),
      distance = countDown - now;
    
    if (distance < 0) {
      clearInterval(this.timer);
      this.setState( { time: { days: 0, hours: 0, minutes: 0, seconds: 0 }, seconds: 0 });
    }
    else {
      let days = Math.floor(distance / day);
      let hours = Math.floor((distance % day) / hour);
      let minutes = Math.floor((distance % hour) / minute);
      let seconds = Math.floor((distance % minute) / second);

      this.setState({
        time: { days, hours, minutes, seconds },
        seconds: distance,
      });
    }    
  }
}