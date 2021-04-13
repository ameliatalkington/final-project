import React from 'react';

const styles = {
  anchor: {
    textDecoration: 'none',
    color: 'black'
  }
};

export default function SearchSuggestions(props) {
  if (props.data.length > 1) {
    return (
      <div className='search-results-container'>
        {
          props.data.map(entry => {
            return (
              <div key={entry.recordid} className='search-suggestions'>
                <SearchResults entry={entry}/>
              </div>
            );
          })
        }
      </div>
    );
  }
  return <div></div>;
}

function SearchResults(props) {
  if (props.entry.datasetid === 'geonames-all-cities-with-a-population-1000') {
    return (
      <a
      style={styles.anchor}
        href={`#results?data=${props.entry.fields.name},${props.entry.fields.admin1_code}`}>
        {props.entry.fields.name}, {props.entry.fields.admin1_code}
      </a>
    );
  } else {
    return (
      <a
        style={styles.anchor}
        href={`#results?data=${props.entry.fields.latitude},${props.entry.fields.longitude}`}>
        {props.entry.fields.postal_code}
      </a>
    );
  }
}
