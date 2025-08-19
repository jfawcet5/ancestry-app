import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CreatePersonPresentation from './presentation';

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function CreatePersonPage() {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        console.log(formData);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const reqBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          }

        fetch(`${ENDPOINT}/api/people/`, reqBody)
          .then(response => {
            if (!response.ok) {
                console.error('error');
            }

            return response.json();
          })
          .then(jsonData => {
            console.log(jsonData.data.id);
          })

        console.log("Submit");
      };

    return (
        <>
            <CreatePersonPresentation onChange={handleChange} onSubmit={handleSubmit}/>
        </>
    )
}