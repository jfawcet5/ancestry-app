import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CreatePersonPresentation from './presentation';

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function CreatePersonPage({pageType="page", onSelect}) {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        console.log('presentation handle change');
        const { name, value } = e.target;
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(e.target);
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        console.log(formData);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handle submit');
        console.log(formData);

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
            console.log("created person");
            console.log(jsonData.data);
            if (onSelect != null) {
              onSelect(e, {
                id: jsonData.data.id,
                name: `${jsonData.data.name.first} ${jsonData.data.name.last}`
              });
            }
          })

        console.log("Submit");
      };

    return (
        <>
            <CreatePersonPresentation onChange={handleChange} onSubmit={handleSubmit}/>
        </>
    )
}