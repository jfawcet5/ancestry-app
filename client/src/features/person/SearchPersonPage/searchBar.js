import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';

//import { Link } from 'react-router-dom';

import styles from "./SearchPerson.module.css";

import { useApi } from '../../../shared/utilities/apiCall.js';

//const ENDPOINT = process.env.REACT_APP_API_URL;



export default function SearchBar({onSetSearchResults, children}) {
    const [searchFilters, setSearchFilters] = useState({});

    const apiCall = useApi();
    
    const handleSearchFilterChange = (e) => {
        const { name, value } = e.target;

        setSearchFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams(searchFilters).toString();

        //fetch(`${ENDPOINT}/api/people?${params}`)
        apiCall(`/people/?${params}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`The server responded with status: ${response.status}`);
                }

                return response.json();
            })
            .then(jsonData => {
                //console.log(jsonData);
                onSetSearchResults(jsonData.data.map((item) => ({
                    id: item.id,
                    name: `${item.name.first} ${item.name.middle && item.name.middle[0]} ${item.name.last}`
                })));
            })
            .catch((error) => {
                console.error(`ERROR! Person search failed: ${error.message}`);
                // Ignore abort errors as they are expected
                if (error.name === "AbortError") return;
            }
        );
    };

    return (
        <SearchBarPresentation onChange={handleSearchFilterChange} 
                               onSubmit={handleSubmitSearch}
                               searchFilters={searchFilters}
                               children={children}
        />
    );
}


function SearchBarPresentation({ onChange,
                                 onSubmit,
                                 searchFilters,
                                 children
 }) {
    return (
        <>
        <h1>Search Bar</h1>
        <form className={styles.searchFilterContainer}>
            <input type="text" name="firstName" placeholder="first name" onChange={onChange}></input>
            <input type="text" name="lastName" placeholder="last name" onChange={onChange}></input>
            <button onClick={onSubmit}>Search</button>
        </form>
        {children}
        </>
    );
}
