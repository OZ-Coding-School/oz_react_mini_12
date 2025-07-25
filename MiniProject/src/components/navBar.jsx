import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    nav: {
        backgroundColor: '#222',
        padding: '10px 20px',
        position: 'fixed',  
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,     
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.2rem',
    },
};

function NavBar() {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>🎬 영화 목록</Link>
        </nav>
    );
}

export default NavBar;