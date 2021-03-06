import React from 'react';

const styles = {
  header: {
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 142, 151, 1)',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '2'
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
  },
  navbar: {
    textDecoration: 'none',
    color: 'white'
  }
};

export default function Header(props) {
  return (
    <header className="header" style={styles.header}>
      <div className="title" style={styles.title}>
        <a href="#" className="navbar" style={styles.navbar}>
          <h1>panacea.</h1>
        </a>
      </div>
      <div className='menu-dropdown'>
        <i className="fas fa-bars" style={styles.menu}></i>
      </div>
    </header>
  );
}
