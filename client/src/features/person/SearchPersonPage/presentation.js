import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import styles from "./SearchPerson.module.css";

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function SearchPersonPresentation({searchResults, 
                                                  searchFilters,
                                                  onChange,
                                                  onSubmit}) {

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
                        {searchResults.map(person => (
                            <li key={person.id}>
                                <Link to={`/people/${person.id}`}>{`${person.name.first} ${person.name.last}`}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}