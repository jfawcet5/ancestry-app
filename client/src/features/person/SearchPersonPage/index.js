import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import SearchPersonPresentation from './presentation';

import styles from "./SearchPerson.module.css";

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function SearchPersonPage() {

    const [searchFilters, setSearchFilters] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters(prev => ({
          ...prev,
          [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams(searchFilters).toString();
        fetch(`${ENDPOINT}/api/people?${params}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`The server responded with status: ${response.status}`);
                }

                return response.json();
            })
            .then(jsonData => {
                setSearchResults(jsonData.data);
            })
            .catch((error) => {
                console.error(`ERROR! Person search failed: ${error.message}`);
                // Ignore abort errors as they are expected
                if (error.name === "AbortError") return;
            })
    }

    useEffect(() => {
        fetch(`${ENDPOINT}/api/people/`)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData);
                setSearchResults(jsonData.data);
            });
    }, []);

    return <SearchPersonPresentation searchResults={searchResults} 
                                     searchFilters={searchFilters}
                                     onChange={handleChange}
                                     onSubmit={handleSubmit}
            />
}