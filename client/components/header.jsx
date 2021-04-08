import React from 'react';

const styles = {
  header: {
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 142, 151, 1)'
  },
  title: {
    marginLeft: '20px',
    color: 'white',
    fontSize: '20px',
    textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'
  },
  menu: {
    marginRight: '28px',
    color: 'white',
    fontSize: '28px',
    textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)'
  }
};

export default function Header(props) {
  return (
    <header className="header" style={styles.header}>
      <div className="title" style={styles.title}>
        <h1>panacea.</h1>
      </div>
      <div className='menu-dropdown'>
        <i className="fas fa-bars" style={styles.menu}></i>
      </div>
    </header>
  );
}
