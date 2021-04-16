import React from 'react';
import RenderSearch from '../pages/search-results';

const styles = {
  filterDiv: {
    backgroundColor: 'white',
    position: 'fixed',
    top: '170px',
    left: '0',
    right: '0'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: '20px',
    borderTop: '2px rgba(0, 142, 151, 1) solid',
    borderBottom: '2px rgba(0, 142, 151, 1) solid'
  },
  input: {
    width: '80%',
    height: '30px',
    marginTop: '20px'
  }
}

export default class FilterEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      startDate: null,
      endDate: null,
      time: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if (this.state.keyword && this.state.endDate) {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&keyword=${this.state.keyword}&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&endDateTime=${this.state.endDate}T${this.state.time}Z&sort=date,asc&city=austin&stateCode=tx&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));
    } else if (this.state.endDate) {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&endDateTime=${this.state.endDate}T${this.state.time}Z&sort=date,asc&city=austin&stateCode=tx&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));
    } else if (this.state.keyword) {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&keyword=${this.state.keyword}&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&sort=date,asc&city=austin&stateCode=tx&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));
    } else {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&sort=date,asc&city=austin&stateCode=tx&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));
    }
  }

  handleChange(event) {
    if (event.target.id === 'keyword') {
      this.setState({keyword: event.target.value});
    } else if (event.target.id === 'start-date') {
      this.setState({startDate: event.target.value});
    } else if (event.target.id === 'end-date') {
      this.setState({endDate: event.target.value});
    } else if (event.target.id === 'time') {
      this.setState({time: `${event.target.value}:00`});
    }
  }

  render() {
    return (
      <div style={styles.filterDiv} className='filter-events'>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <input style={styles.input} onChange={this.handleChange} type="text" name="keyword" id="keyword" placeholder="Artists, Genre, Keyword"/>
          <input style={styles.input} onChange={this.handleChange} type="date" name="start-date" id="start-date" required/>
          <input style={styles.input} onChange={this.handleChange} type="date" name="end-date" id="end-date"/>
          <input style={styles.input} onChange={this.handleChange} type="time" name="time" id="time" required/>
          <input style={styles.input} onChange={this.handleChange} type="submit" name="submit" id="submit"/>
        </form>
      </div>
    );
  }
}
