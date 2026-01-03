import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';

//import { Link } from 'react-router-dom';

import SearchPersonPresentation from './presentation';

//import { transformSearchResult } from '../../../shared/utilities/transform';

//import styles from "./SearchPerson.module.css";

import { useApi } from '../../../shared/utilities/apiCall.js';

//const ENDPOINT = process.env.REACT_APP_API_URL;

export default function SearchPersonPage({pageType = "page", onSelect}) {

    const [searchFilters, setSearchFilters] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const apiCall = useApi();

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
        //fetch(`${ENDPOINT}/api/people?${params}`)
        apiCall(`/people/?${params}`)
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
                        name: `${item.name.first} ${item.name.middle && item.name.middle[0]} ${item.name.last}`
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

    return <SearchPersonPresentation searchResults={searchResults} 
                                     searchFilters={searchFilters}
                                     onChange={handleChange}
                                     onSubmit={handleSubmit}
                                     pageType={pageType}
                                     onSelect={onSelect}
            />
}