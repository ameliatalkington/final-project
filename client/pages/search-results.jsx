import React from 'react';
import FilterEvents from './filter-events';

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

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      filter: 'off'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.filter === 'off') {
      this.setState({ filter: 'on' });
    } else {
      this.setState({ filter: 'off' });
    }
  }

  componentDidMount() {
    if (Number(this.props.results)) {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&latlong=${this.props.results}&locale=*&sort=date,asc`)
        .then(res => res.json())
        .then(data => {
          if (data._embedded) {
            this.setState({ product: data._embedded.events });
          } else {
            this.setState({ product: 'empty' });
          }
        })
        .catch(err => console.error(err));
    } else {
      const cityState = this.props.results.split(',');
      const city = cityState[0].toLowerCase();
      const state = cityState[1].toLowerCase();
      state.split(' ').join('%20');
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AJhKApTPLUNlyEAiqkodR7pR6b9Ht1Rq&locale=*&sort=date,asc&city=${city}&stateCode=${state}`)
        .then(res => res.json())
        .then(data => {
          if (data._embedded) {
            this.setState({ product: data._embedded.events });
          } else {
            this.setState({ product: 'empty' });
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    if (!this.state.product) return null;
    if (this.state.product === 'empty') {
      return (
        <RenderMessage />
      );
    }
    return (
      <div className='activity-results-container'>
        <div className='mini-header'>
          <div className='title-filter'>
            <h2 style={styles.title}>{this.props.results.split(',').join(', ')}</h2>
            <button onClick={this.handleClick} style={styles.filter}>filter</button>
          </div>
          <a className='back-results' href="#">back</a>
        </div>
        {this.state.filter === 'on' &&
          <FilterEvents location={this.props.results}/>
        }
          <div className='results'>
            {
              this.state.product.map(entry => {
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

export function RenderSearch(props) {
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
        <a style={styles.anchor} href="#">
          new search
        </a>
      </div>
    </div>
  );
}
