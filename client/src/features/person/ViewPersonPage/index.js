import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Temporary
import SearchSelector from '../../../shared/components/SearchSelector.js';
import ViewPersonPresentation from './presentation.js';

import { transformPersonData } from '../../../shared/utilities/transform.js';

const ENDPOINT = process.env.REACT_APP_API_URL;

function ViewPersonPage() {
    const { id } = useParams();
    const [personData, setPersonData] = useState(null);
    const [formData, setFormData] = useState(null); // editable copy of person data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [activeField, setActiveField] = useState("");

    useEffect(() => {
        // Reset state each time a new ID is fetched.
        setLoading(true);
        setError(null);
        setIsEditMode(false);

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
                setPersonData(transformPersonData(jsonData.data));
                setFormData(transformPersonData(jsonData.data));
                console.log("successfully loaded data from API");
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

    const handleSave = () => {
        console.log("save form data");

        setIsEditMode(false);
    }

    const handleCancel = () => {
        console.log("Handle Cancel");
        setFormData(personData);
        setIsEditMode(false);
    }

    const handleSelect = (field, value) => {
        console.log("Handle Select new Value");
        console.log(`Field: ${field}, value:`);
        console.log(value);
        console.log("Old value: ");
        console.log(formData.father);
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    if (loading || !personData) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    console.log("return");
    console.log(`id: ${id}`);

    return (
        <>
            <ViewPersonPresentation personData={formData}
                                    isEditMode={isEditMode}
                                    setIsEditMode={setIsEditMode}
                                    handleSave={handleSave}
                                    onSelect={handleSelect}
                                    onCancel={handleCancel}
            />
        </>
    );
}

export default ViewPersonPage;