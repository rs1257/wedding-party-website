import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import GuestCardYesNo from "./GuestCardYesNo";
import SummaryCard from "./SummaryCard";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../common/Button';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
        totalGuests: 0,
        responses: 0,
        attending: 0,
        guests: [],
        starter: "",
        main: "",
        dessert: "",
        filter: "all"
    };

    this.updateInterval = null;
    this.updateList = this.updateList.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }

    axios
      .post('/api/settings/getMultiple', { name: 'Starter, Main, Dessert' })
      .then((res) => {
        if (res.data) {
          const starter = res.data[0].value;
          const main = res.data[1].value;
          const dessert = res.data[2].value;
          this.setState({ starter, main, dessert });
        }
      })
      .catch((err) => console.log(err));

      this.updateList();
      // update guest list every 5 minutes
      this.updateInterval = setInterval(this.updateList, 300000);
  }

  async updateList() {
    console.log('Updating Guests List');
    axios
      .post("/api/rsvp/list", { attending: this.state.filter })
      .then((res) => {
        let responses = 0, attending = 0;
        const data = res.data;
        data.forEach((g) => {
          if (g.attending === 'yes') {
            attending++;
            responses++;
          }
          else if (g.attending === 'no') {
            responses++;
          }
        });

        if (this.state.filter !== 'all') {
          this.setState({ guests: data });
        }
        else {
          this.setState({ guests: data, totalGuests: data.length, responses, attending });
        }
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  handleFilesSelected(event) {
    const file = Array.from(event.target.files);
    console.log(file);
    var reader = new FileReader();

    reader.onload = function(e) {
      const guests = reader.result.split('\n');
      guests.forEach((guest) => {
        if (guest) {
          axios
            .post("/api/rsvp/add", { name: guest.trim() })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
      });
      
    }

    console.log(file);
    reader.readAsText(file[0]);
    //const errors = validateExcelUploadInput(file);
    //console.log(errors);
    

  }

  handleFilter(event) {
    let value = null;
    if (event.target.name === 'attending-filter') {
      value = "yes" 
    }
    else if (event.target.name === 'not-attending-filter') {
      value = "no"
    }
    else {
      value = "all" 
    }

    this.setState({ filter: value }, () => {
      this.updateList();
    });
    
  }

  render() {
    const menu = {starter: this.state.starter, main: this.state.main, dessert: this.state.dessert};
    return (
      <div>
        <h1>Dashboard</h1>
        <SummaryCard 
          totalGuests={this.state.totalGuests}
          responses={this.state.responses}
          attending={this.state.attending}
        />
        <h2>Filters</h2>
        <div className="filter-btn-group">
          <Button type="filter" name="all-filter" value="All" onClick={this.handleFilter} />
          <Button type="filter" name="attending-filter" value="Attending" onClick={this.handleFilter} />
          <Button type="filter" name="not-attending-filter" value="Not Attending" onClick={this.handleFilter} />
        </div>
        <div>
          <h2>Guests</h2>
          <div className="cards">
            {this.state.guests.map((guest) => {
              return [
                <GuestCardYesNo menu={menu} key={guest._id} guest={guest} updateList={this.updateList} />
              ];
            })}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { })(withRouter(Dashboard));
