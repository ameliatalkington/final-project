import React from 'react';

function SearchSuggestions(props) {
  if (props.data.length > 1) {
    if (props.data[0].datasetid === 'geonames-all-cities-with-a-population-1000') {
      return (
        <div className='search-results-container'>
          {
            props.data.map(entry => {
              return (
                <div key={entry.recordid} className='search-suggestions'>
                  {`${entry.fields.name}, ${entry.fields.admin1_code}`}
                </div>
              );
            })
          }
        </div>
      );
    } else if (props.data[0].datasetid === 'geonames-postal-code') {
      return (
        <div className='search-results-container'>
          {
            props.data.map(entry => {
              return (
                <div key={entry.recordid} className='search-suggestions'>
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
