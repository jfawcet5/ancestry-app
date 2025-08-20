import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import SearchPersonPresentation from './presentation';

import { transformSearchResult } from '../../../shared/utilities/transform';

import styles from "./SearchPerson.module.css";

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function SearchPersonPage({pageType = "page", onSelect}) {

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
                if (pageType === "modal") {
                    setSearchResults(jsonData.data.map((item) => ({
                        id: item.id,
                        name: `${item.name.first} ${item.name.last}`
                    })));
                    console.log(searchResults);
                }
                else {
                    console.log("set results with transformed data. input: ");
                    console.log(jsonData.data);
                    setSearchResults(jsonData.data);
                }
            })
            .catch((error) => {
                console.error(`ERROR! Person search failed: ${error.message}`);
                // Ignore abort errors as they are expected
                if (error.name === "AbortError") return;
            })
    }

    useEffect(() => {
        if (pageType === "modal") return;

        fetch(`${ENDPOINT}/api/people/`)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log("Successfully retrieved search results:");
                console.log(jsonData.data);
                if (pageType === "modal") {
                    setSearchResults(jsonData.data.map((item) => ({
                        id: item.id,
                        name: `${item.name.first} ${item.name.last}`
                    })));
                    console.log(searchResults);
                }
                else {
                    console.log("set results with transformed data. input: ");
                    console.log(jsonData.data);
                    setSearchResults(jsonData.data);
                }
            });
    }, []);

    return <SearchPersonPresentation searchResults={searchResults} 
                                     searchFilters={searchFilters}
                                     onChange={handleChange}
                                     onSubmit={handleSubmit}
                                     pageType={pageType}
                                     onSelect={onSelect}
            />
}