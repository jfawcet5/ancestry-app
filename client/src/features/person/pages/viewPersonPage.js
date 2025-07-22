import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from "../../../shared/components/pageLayout.js";
import PersonHeader from "../components/personHeader.js";

const ENDPOINT = process.env.REACT_APP_API_URL;

function ViewPersonPage() {
    const { id } = useParams();
    const [personData, setPersonData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${ENDPOINT}/api/people/${id}`)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData);
                setPersonData(jsonData.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load person");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    const names = personData.name.split(" ");
    const first = names[0];
    const middle = names.length > 2 ? "": names[1];
    const last = names.length > 2 ? names[2]: names[1];

    const headerData = {
        firstName: first,
        middleName: middle,
        lastName: last,
        portrait: null,
        birth: {
            date: "1940",
            location: "Salem, OR"
        },
        death: {
            date: "1980",
            location: "Portland, OR"
        },
        burial: {
            name: "Zion Memorial Park",
            location: "Canby, OR"
        },
        mother: {
            id: 2,
            name: "Mary Major"
        },
        father: {
            name: "Jack Doe"
        }
    };

    console.log(`id: ${id}`);
    return (
        <PageLayout>
            <PersonHeader personData={headerData}/>
            <p>{JSON.stringify(personData)}</p>
        </PageLayout>
    );
}

export default ViewPersonPage;