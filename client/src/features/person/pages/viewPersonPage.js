import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from "../../../shared/components/pageLayout.js";
import PersonHeader from "../components/personHeader.js";
import RelationSection from '../components/relationSection.js';

const ENDPOINT = process.env.REACT_APP_API_URL;

function ViewPersonPage() {
    const { id } = useParams();
    const [personData, setPersonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset state each time a new ID is fetched.
        setLoading(true);
        setError(null);

        // For aborting stale fetch calls.
        const controller = new AbortController();
        const signal = controller.signal;

        // Fetch person data from backend
        fetch(`${ENDPOINT}/api/people/${id}`, {signal})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`The server responded with status: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonData => {
                setLoading(false);
                setPersonData(jsonData.data);
            })
            .catch((error) => {
                console.error(`Failed to load person: ${id}`, error);
                // Ignore abort errors as they are expected
                if (error.name === "AbortError") return;
                setLoading(false);
                setError("Failed to load person");
            });
        
        return () => {
            // Abort any ongoing requests during unmount/cleanup
            controller.abort();
        };
    }, [id]);

    if (loading || !personData) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    //const names = personData.name.split(" ");
    //const first = names[0];
    //const middle = names.length > 2 ? "": names[1];
    //const last = names.length > 2 ? names[2]: names[1];

    const headerData = {
        firstName: personData.name.first,
        middleName: personData.name.middle,
        lastName: personData.name.last,
        portrait: null,
        birth: {
            date: personData.birth,
            location: "Salem, OR"
        },
        death: {
            date: personData.death,
            location: "Portland, OR"
        },
        burial: {
            name: "Zion Memorial Park",
            location: "Canby, OR"
        },
        mother: personData.relations.mother,
        father: personData.relations.father
    };

    console.log("return");
    console.log(`id: ${id}`);
    return (
        <PageLayout>
            <PersonHeader personData={headerData}/>
            <RelationSection relations={personData.relations} />
            <p>{JSON.stringify(personData)}</p>
        </PageLayout>
    );
}

export default ViewPersonPage;