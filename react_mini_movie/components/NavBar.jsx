import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../src/index.css';

export default function Navbar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim() === ""){
            navigate('/');
        } else{
            navigate(`/search?query=${encodeURIComponent(newQuery)}`);
        };
    };
    return(
        <nav className="navber">
            <h2><Link to="/">🎬 Movie App</Link></h2>

            <input 
            type="text" 
            placeholder="영화 제목 검색..."
            value={query}
            onChange={handleChange}
            className="search-input"
            />
        </nav>
    );
}