import React from 'react';

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

export default function Home(props) {
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
          <form>
            <input style={styles.search} type="search" placeholder='city, state, county, zip' />
          </form>
        </div>
      </div>
    </>
  );
}
