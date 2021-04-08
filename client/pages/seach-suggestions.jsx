import React from 'react';

const styles = {
  searchContainer: {
    width: '250px',
    border: 'solid rgba(0, 142, 151, 1) 2px',
    borderTop: 'none',
    borderRadius: '7px',
    backgroundColor: 'white'
  },
  searchResults: {
    width: '246px',
    height: '40px',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px'
  }
};

function SearchSuggestions(props) {
  if (props.data.length > 1) {
    if (props.data[0].datasetid === 'geonames-all-cities-with-a-population-1000') {
      return (
        <div className='search-results' style={styles.searchContainer}>
          {
            props.data.map(entry => {
              return (
                <div key={entry.recordid} style={styles.searchResults}>
                  {`${entry.fields.name}, ${entry.fields.admin1_code}`}
                </div>
              );
            })
          }
        </div>
      );
    } else if (props.data[0].datasetid === 'geonames-postal-code') {
      return (
        <div className='search-results'>
          {
            props.data.map(entry => {
              return (
                <div key={entry.recordid} style={styles.searchResults}>
                  {entry.fields.postal_code}
                </div>
              );
            })
          }
        </div>
      );
    }

  }
  return <div></div>;
}

export default SearchSuggestions;
