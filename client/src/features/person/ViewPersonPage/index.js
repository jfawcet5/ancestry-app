import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Temporary
//import SearchSelector from '../../../shared/components/SearchSelector.js';
import ViewPersonPresentation from './presentation.js';

import { transformPersonData } from '../../../shared/utilities/transform.js';
import { computePersonDiff } from '../../../shared/utilities/computeDiff.js';

import { useApi } from '../../../shared/utilities/apiCall.js';

const ENDPOINT = process.env.REACT_APP_API_URL;

function ViewPersonPage() {
    const { id } = useParams();
    const [personData, setPersonData] = useState(null);
    const [formData, setFormData] = useState(null); // editable copy of person data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const apiCall = useApi();

    //const [activeField, setActiveField] = useState("");

    useEffect(() => {
        // Reset state each time a new ID is fetched.
        setLoading(true);
        setError(null);
        setIsEditMode(false);

        // For aborting stale fetch calls.
        const controller = new AbortController();
        const signal = controller.signal;

        // Fetch person data from backend
        //fetch(`${ENDPOINT}/api/people/${id}`, {signal})
        apiCall(`/people/${id}`, {signal})
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
                console.log(transformPersonData(jsonData.data));
            })
            .catch((error) => {
                console.error(`Failed to load person: ${id}`, error);
                // Ignore abort errors as they are expected
                setLoading(false);
                if (error.name === "AbortError") return;
                setError("Failed to load person");
            });
        
        return () => {
            // Abort any ongoing requests during unmount/cleanup
            controller.abort();
        };
    }, [id, apiCall]);

    const handleSave = () => {
        console.log("save form data");
        const changes = computePersonDiff(personData, formData);
        console.log(computePersonDiff(personData, formData));

        if (Object.keys(changes).length !== 0) {
            console.log("Send changes to server");
            const config = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(changes)
            };

            fetch(`${ENDPOINT}/api/people/${id}`, config)
                .then(response => {
                    console.log("Save changes");
                    setPersonData(formData);
                })
                .catch(error => {
                    console.error(error);
            });
        }

        console.log("End handle Save");
        console.log(personData)
        console.log(formData)

        setIsEditMode(false);
    }

    const handleCancel = () => {
        console.log("Handle Cancel");
        setFormData(personData);
        setIsEditMode(false);
    }

    const handleFieldChange = (field, value) => {
        console.log("Handle Select new Value");
        console.log(`Field: ${field}, value:`);
        console.log(value);
        console.log("Old value: ");
        console.log(formData[field]);
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleRelationChange = (field, operation, value) => {
        console.log("Handle Select new Value");
        console.log(`Field: ${field}, value:`);
        console.log(value);
        console.log("Old value: ");
        console.log(formData[field]);
        setFormData(prev => {

            let newValue;

            if (operation === "add") {
                newValue = [...prev[field], value];
            }
            else {
                newValue = prev[field].filter(item => item.id !== value.id);
            }
            
            return {
                ...prev,
                [field]: newValue
            }
        });
    }

    if (loading || (!personData && !error)) {
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
                                    onSelect={handleFieldChange}
                                    onRelationChange={handleRelationChange}
                                    onCancel={handleCancel}
            />
        </>
    );
}

export default ViewPersonPage;