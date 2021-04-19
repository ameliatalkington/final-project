import React from 'react';
import FilterEvents from '../pages/filter-events';

const styles = {
  images: {
    width: '100%'
  },
  more: {
    width: '100%',
    height: '40px',
    display: 'flex',
    justifyContent: 'center'
  },
  place: {
    width: '100%',
    height: '30px'
  },
  message: {
    width: '100%',
    position: 'absolute',
    top: '100px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  title: {
    fontStyle: 'italic'
  },
  filter: {
    marginLeft: '0.8rem',
    width: '65px',
    height: '30px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'rgba(170, 170, 170, 1)'
  },
  anchor: {
    textDecoration: 'none',
    color: 'black',
    cursor: 'pointer'
  }
};

export default class FilteredResults extends React.Component {
  constructor(props) {
    super(props);
    const dataArray = this.props.filters.split(';');
    this.state = {
      filteredResults: null
    };
    for (let i = 0; i < dataArray.length; i++) {
      const keyValue = dataArray[i].split('/');
      this.state[keyValue[0]] = keyValue[1];
    }
  }

  componentDidMount() {
    if (this.state.keyword && this.state.endDate) {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&keyword=${this.state.keyword}&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&endDateTime=${this.state.endDate}T${this.state.time}Z&sort=date,asc&city=${this.state.city.split(',')[0]}&stateCode=${this.state.city.split(',')[1]}&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          if (data._embedded) {
            this.setState({ filteredResults: data._embedded.events });
          } else {
            this.setState({ filteredResults: 'empty' });
          }
        })
        .catch(err => console.error(err));
    } else if (this.state.endDate) {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&endDateTime=${this.state.endDate}T${this.state.time}Z&sort=date,asc&city=${this.state.city.split(',')[0]}&stateCode=${this.state.city.split(',')[1]}&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          if (data._embedded) {
            this.setState({ filteredResults: data._embedded.events });
          } else {
            this.setState({ filteredResults: 'empty' });
          }
        })
        .catch(err => console.error(err));
    } else if (this.state.keyword) {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&keyword=${this.state.keyword}&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&sort=date,asc&city=${this.state.city.split(',')[0]}&stateCode=${this.state.city.split(',')[1]}&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          if (data._embedded) {
            this.setState({ filteredResults: data._embedded.events });
          } else {
            this.setState({ filteredResults: 'empty' });
          }
        })
        .catch(err => console.error(err));
    } else {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&locale=*&startDateTime=${this.state.startDate}T${this.state.time}Z&sort=date,asc&city=${this.state.city.split(',')[0]}&stateCode=${this.state.city.split(',')[1]}&preferredCountry=us`)
        .then(res => res.json())
        .then(data => {
          if (data._embedded) {
            this.setState({ filteredResults: data._embedded.events });
          } else {
            this.setState({ filteredResults: 'empty' });
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    if (!this.state.filteredResults) return null;
    if (this.state.filteredResults === 'empty') {
      return (
        <RenderMessage />
      );
    }
    return (
      <div className='activity-results-container'>
        <div className='mini-header'>
          <div className='title-filter'>
            <h2 style={styles.title}>{this.state.city.split(',').join(', ')}</h2>
          </div>
          <a className='back-results' href={`#results?data=${this.state.city}`}>back</a>
        </div>
        {this.state.filter === 'on' &&
          <FilterEvents location={this.state.city} />
        }
        <div className='results'>
          {
            this.state.filteredResults.map(entry => {
              return (
                <div key={entry.id} className='individual-result'>
                  <RenderSearch entry={entry} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

function RenderSearch(props) {
  const newTime = [];
  const newDate = [];
  if (props) {
    if (props.entry.dates.start.localTime) {
      const timeArray = props.entry.dates.start.localTime.split(':');
      if (timeArray[0] > 12) {
        newTime.push(timeArray[0] - 12);
        newTime.push(`${timeArray[1]}pm`);
      } else {
        newTime.push(timeArray[0]);
        newTime.push(`${timeArray[1]}am`);
      }
    }
    if (props.entry.dates.start.localDate) {
      const dateArray = props.entry.dates.start.localDate.split('-');
      newDate.push(`${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`);
    }
    return (
      <div>
        <a href={`#entry?eventId=${props.entry.id}`}>
          <img style={styles.images} src={props.entry.images[0].url} alt="image" />
        </a>
        <h3>{props.entry.name}</h3>
        <h3>{newTime.join(':')}</h3>
        <h3>{newDate}</h3>
      </div>
    );
  }
}

function RenderMessage() {
  return (
    <div style={styles.message}>
      <h3>Sorry, your search has no results</h3>
      <div style={styles.more}>
        <a style={styles.anchor} href={`#results?data=${this.state.city}`}>
          new search
        </a>
      </div>
    </div>
  );
}
