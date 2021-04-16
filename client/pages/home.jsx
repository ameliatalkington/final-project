import React from 'react';
import FilterEvents from './filter-events';
import SearchSuggestions from './seach-suggestions';
import SearchResults from './search-results';

const styles = {
  tagline: {
    fontStyle: 'italic',
    height: '160px',
    width: '250px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '23px',
    color: 'white'
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      name: '',
      stateCode: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const search = event.target.value;
    this.setState({ search });
    this.getEntires(search);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (Number(this.state.search)) {
      fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code&q=${this.state.search}&rows=5&facet=country_code&facet=postal-code&refine.country_code=US`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.location.assign(`#results?data=${data.records[0].fields.latitude},${data.records[0].fields.longitude}`);
        })
        .catch(err => console.error(err));
    } else {
      fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${this.state.search}&rows=5&sort=population&facet=country&refine.country=United+States`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ name: data.records[0].fields.name });
          this.setState({ stateCode: data.records[0].fields['admin1_code'] });
          window.location.assign(`#results?data=${this.state.name},${this.state.stateCode}`);
        })
        .catch(err => console.error(err));
    }
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
    return(
      <>
        <div className='home-search'>
          <div className='float-text' style={styles.tagline}>
            <h3>find your panacea...</h3>
          </div>
          <div className='container'>
            <div className='buttons'>
              <button className='buttons search'>search</button>
              <button className='buttons filter'>filter</button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <input className='search-input' value={this.state.search}
                onChange={this.handleChange} type="search" placeholder='city, state, zip' />
            </form>
              <SearchSuggestions data={this.state.data} />
          </div>
        </div>
      </>
    );
  }

}
