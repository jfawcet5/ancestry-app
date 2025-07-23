import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_API_URL;

function SearchPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${ENDPOINT}/api/people/`)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData);
                setData(jsonData.data);
            });
    }, [])

    return (
        <div>
            <h1>Search Page: Not implemented yet</h1>
            <p>Results:</p>
            <ul>{data.map(item => 
                <li key={item.id}>
                    <Link to={`/people/${item.id}`}>{`${item.name.first} ${item.name.last}`}</Link>
                </li>)}
            </ul>
        </div>
    );
}

export default SearchPage;