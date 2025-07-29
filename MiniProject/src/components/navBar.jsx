import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

const styles = {
    nav: {
        backgroundColor: '#222',
        padding: '10px 20px',
        position: 'fixed',  
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',   
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.2rem',
    },
    searchWrapper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '4px 12px',
        width: '280px',
    },
    input: {
        flex: 1,
        border: 'none',
        outline: 'none',
        fontSize: '1rem',
        padding: '8px',
        borderRadius: '20px',
    },
};

function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            navigate(`/?query=${encodeURIComponent(debouncedSearchTerm)}`);
        }
    }, [debouncedSearchTerm, navigate]);

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>🎬 영화 목록</Link>
            <div style={styles.searchWrapper}>
                <input
                    type="text"
                    placeholder="영화 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
            </div>
        </nav>
    );
}

export default NavBar;