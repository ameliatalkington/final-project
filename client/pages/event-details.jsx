import React from 'react';

const styles = {
  anchor: {
    textDecoration: 'none',
    color: 'black'
  }
};

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }

  componentDidMount() {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&id=${this.props.eventId}&locale=*&size=1`)
      .then(res => res.json())
      .then(data => {
        this.setState({ event: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.event) return null;
    const result = this.state.event._embedded.events[0];
    let newTimeString = '';
    const newTime = [];
    const newDate = [];
    if (result.dates.start.localTime) {
      const timeArray = result.dates.start.localTime.split(':');
      if (timeArray[0] > 12) {
        newTime.push(timeArray[0] - 12);
        newTime.push(`${timeArray[1]}pm`);
      } else {
        newTime.push(timeArray[0]);
        newTime.push(`${timeArray[1]}am`);
      }
      newTimeString = newTime.join(':') + ' |';
    }
    if (result.dates.start.localDate) {
      const dateArray = result.dates.start.localDate.split('-');
      newDate.push(`${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`);
    }
    return (
      <div className='activity-results-container'>
        <div style={styles.back} className='back'>
          <a style={styles.anchor} href={`#results?data=${result._embedded.venues[0].city.name},${result._embedded.venues[0].state.stateCode}`}>back</a>
        </div>
        <div className='result'>
          <img className='event-image' src={result.images[0].url} alt="image" />
          {result.seatmap &&
            <img className='event-image' src={result.seatmap.staticUrl} alt='seatmap' />
          }
        </div>
        <div className='information'>
          <h2 className='name'>{result.name}</h2>
          <h3 className='venue'>{result._embedded.venues[0].name}</h3>
          <h3 className='address'>{result._embedded.venues[0].address.line1}, {result._embedded.venues[0].city.name}, {result._embedded.venues[0].state.stateCode}</h3>
          <h3 className='date-time'>{newTimeString} {newDate[0]}</h3>
          <a href={result.url}>
            <button className='get-ticket'>Get A Ticket</button>
          </a>
        </div>
      </div>
    );
  }
}
