import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_API_URL;

function ViewPersonPage() {
    const { id } = useParams();
    const [personData, setPersonData] = useState();

    useEffect(() => {
        fetch(`${ENDPOINT}/api/people/${id}`)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData);
                setPersonData(jsonData.data);
            });
    }, []);

    console.log(`id: ${id}`);
    return (
        <div>
            <h1>View Person: Not Implemented Yet</h1>
            <p>Results:</p>
            <pre>{JSON.stringify(personData, null, 2)}</pre>
        </div>
    );
}

export default ViewPersonPage;