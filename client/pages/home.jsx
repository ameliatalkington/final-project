import React from 'react';

const styles = {

};

export default function Home(props) {
  return (
    <>
      <div className='container'>
        <div className='buttons'>
          <button>search</button>
          <button>filter</button>
        </div>
        <form>
          <input type="search" placeholder='city, state, country, zip'/>
        </form>
      </div>
    </>
  );
}
