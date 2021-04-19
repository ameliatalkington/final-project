import React from 'react';

export default class FilterEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.location.split(',')[0],
      state: props.location.split(',')[1],
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
    if (this.state.keyword && this.state.endDate) {
      window.location.assign(`#filter?data=city/${this.state.city},${this.state.state};keyword/${this.state.keyword};startDate/${this.state.startDate};endDate/${this.state.endDate};time/${this.state.time}`);
    } else if (this.state.endDate) {
      window.location.assign(`#filter?data=city/${this.state.city},${this.state.state};startDate/${this.state.startDate};endDate/${this.state.endDate};time/${this.state.time}`);
    } else if (this.state.keyword) {
      window.location.assign(`#filter?data=city/${this.state.city},${this.state.state};keyword/${this.state.keyword};startDate/${this.state.startDate};time/${this.state.time}`);
    } else {
      window.location.assign(`#filter?data=city/${this.state.city},${this.state.state};startDate/${this.state.startDate};time/${this.state.time}`);
    }
  }

  handleChange(event) {
    if (event.target.id === 'keyword') {
      this.setState({ keyword: event.target.value });
    } else if (event.target.id === 'start-date') {
      this.setState({ startDate: event.target.value });
    } else if (event.target.id === 'end-date') {
      this.setState({ endDate: event.target.value });
    } else if (event.target.id === 'time') {
      this.setState({ time: `${event.target.value}:00` });
    }
  }

  render() {
    return (
        <div className='filter-events'>
          <form className='filter-form' onSubmit={this.handleSubmit}>
            <div className='inputs-container'>
              <label htmlFor="keyword">keywords:</label>
              <input className='filter-input' onChange={this.handleChange} type="text" name="keyword" id="keyword" placeholder="Artists, Genre, Keyword" />
            </div>
            <div className='inputs-container'>
              <label htmlFor="start-date">start date:</label>
              <input className='filter-input' onChange={this.handleChange} type="date" name="start-date" id="start-date" required />
            </div>
            <div className='inputs-container'>
              <label htmlFor="end-date">end date:</label>
              <input className='filter-input' onChange={this.handleChange} type="date" name="end-date" id="end-date" />
            </div>
            <div className='inputs-container'>
              <label htmlFor="time">earliest start time:</label>
              <input className='filter-input' onChange={this.handleChange} type="time" name="time" id="time" required />
            </div>
            <div className='inputs-container'>
              <input className='filter-input' onChange={this.handleChange} type="submit" name="submit" id="submit" value='submit' />
            </div>
          </form>
        </div>
    );
  }
}
