import React from 'react';
import Header from './components/header';
import Home from './pages/home';
import { parseRoute } from './lib';
import SearchResults from './pages/search-results';
import EventDetails from './pages/event-details';
import FilteredResults from './pages/filtered-results';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const parse = parseRoute(window.location.hash);
      this.setState({ route: parse });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'results') {
      const data = route.params.get('data');
      return <SearchResults results={data} />;
    }
    if (route.path === 'entry') {
      const eventId = route.params.get('eventId');
      return <EventDetails eventId={eventId} />;
    }
    if (route.path === 'filter') {
      const filters = route.params.get('data');
      return <FilteredResults filters={filters} />;
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.renderPage()}
      </>
    );
  }
}
