import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import styles from "./SearchPerson.module.css";

const ENDPOINT = process.env.REACT_APP_API_URL;



export default function SearchBar({onSetSearchResults, children}) {
    const [searchFilters, setSearchFilters] = useState({});
    
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

        fetch(`${ENDPOINT}/api/people?${params}`)
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
                    name: `${item.name.first} ${item.name.last}`
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





function SearchPersonPage({pageType = "page", onSelect}) {

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
                    console.log(jsonData);
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
                console.log(response);
                return response.json();
            })
            .then(jsonData => {
                console.log("Successfully retrieved search results:");
                console.log(jsonData);
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







function SearchPersonPresentation({searchResults, 
                                                  searchFilters,
                                                  onChange,
                                                  onSubmit,
                                                  pageType,
                                                  onSelect}) {
    let resultsList = null;

    if (pageType == "modal") {
        resultsList = searchResults.map(person => (
            <li key={person.id}>
                <button onClick={(e) => onSelect(e, person)}>{`${person.name}`}</button>
            </li>
        ));
    }
    else {
        resultsList = searchResults.map(person => (
            <li key={person.id}>
                <Link to={`/people/${person.id}`}>{`${person.name.first} ${person.name.last}`}</Link>
            </li>
        ));
    }

    return (
        <>
            <div classname={styles.searchPageContainer}>
                <h1>Search</h1>

                <form className={styles.searchFilterContainer}>
                    <input type="text" name="firstName" value={searchFilters["firstName"] || ""} placeholder="first name" onChange={onChange}></input>
                    <input type="text" name="lastName" value={searchFilters["lastName"] || ""} placeholder="last name" onChange={onChange}></input>
                    <button onClick={onSubmit}>Search</button>
                </form>

                <div className={styles.searchResultsContainer}>
                    <ul>
                        {resultsList}
                    </ul>
                </div>
            </div>
        </>
    )
}