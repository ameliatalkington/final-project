import React from 'react';
import SearchSuggestions from './seach-suggestions';
// let timeout;

const styles = {
  tagline: {
    fontStyle: 'italic',
    height: '160px',
    width: '250px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '23px',
    color: 'white'
  },
  container: {
    width: '250px',
    height: '100px'
  },
  searchButton: {
    width: '80px',
    height: '35px',
    fontSize: '22px',
    border: 'solid rgba(0, 142, 151, 1) 2px',
    borderRadius: '7px 7px 0 0',
    borderRight: 'none',
    borderBottom: 'none',
    backgroundColor: 'rgba(0, 142, 151, 1)',
    color: 'white'
  },
  filterButton: {
    backgroundColor: 'rgba(244, 249, 249, 1)',
    width: '80px',
    height: '35px',
    fontSize: '22px',
    border: 'solid rgba(0, 142, 151, 1) 2px',
    borderBottom: 'none',
    borderRadius: '7px 7px 0 0'
  },
  search: {
    width: '250px',
    height: '40px',
    border: 'solid rgba(0, 142, 151, 1) 2px',
    fontStyle: 'italic',
    fontSize: '18px',
    borderRadius: '0 7px 7px 7px',
    paddingLeft: '10px'
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // clearTimeout(timeout);
    const search = event.target.value;
    this.setState({ search });
    this.getEntires(search);
    // timeout = setTimeout(timeoutFunction, 500);

    // function timeoutFunction(search) {
    //   this.getEntires(search);
    // }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getEntires(this.state.search);
  }

  getEntires(search) {
    if (Number(search)) {
      fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code&q=${search}&rows=5&facet=country_code&facet=postal-code&refine.country_code=US`)
        .then(res => res.json())
        .then(data => {
          this.setState({ data: data.records });
        })
        .catch(err => console.error(err));
    } else {
      if (search) {
        fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${search}&rows=5&sort=population&facet=country&refine.country=United+States`)
          .then(res => res.json())
          .then(data => {
            this.setState({ data: data.records });
          })
          .catch(err => console.error(err));
      }
    }
  }

  render() {
    return (
      <>
        <div className='home-search'>
          <div className='float-text' style={styles.tagline}>
            <h3>find your panacea...</h3>
          </div>
          <div className='container' style={styles.container}>
            <div className='buttons'>
              <button style={styles.searchButton}>search</button>
              <button style={styles.filterButton}>filter</button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <input style={styles.search} value={this.state.search}
               onChange={this.handleChange} type="search" placeholder='city, state, zip' />
            </form>
            <SearchSuggestions data={this.state.data}/>
          </div>
        </div>
      </>
    );
  }
}
