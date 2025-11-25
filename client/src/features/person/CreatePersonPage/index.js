import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';

import CreatePersonPresentation from './presentation';

import { useApi } from '../../../shared/utilities/apiCall.js';

//const ENDPOINT = process.env.REACT_APP_API_URL;

export default function CreatePersonPage({pageType="page", onSelect}) {
    const [resultMessage, setResultMessage] = useState("");

    const [formData, setFormData] = useState({
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      deathDate: "",
      gender: "",
    });

    const apiCall = useApi();

    useEffect(() => {
      if (!resultMessage) {
        return;
      }

      const timer = setTimeout(() => setResultMessage(""), 5000);
      return () => clearTimeout(timer);
    }, [resultMessage]);

    const handleChange = (e) => {
      //console.log('presentation handle change');
      const { name, value } = e.target;
      //console.log(e.target.name);
      //console.log(e.target.value);
      //console.log(e.target);
      setFormData(prev => ({
        ...prev,
      [name]: value
      }));
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

        //fetch(`${ENDPOINT}/api/people/`, reqBody)
        apiCall(`/people`, reqBody)
          .then(response => {
            if (!response.ok) {
                console.error('error');
                throw new Error("Request Failed");
            }

            return response.json();
          })
          .then(jsonData => {
            console.log("created person");
            console.log(jsonData.data);
            setResultMessage("Person Created Successfully");
            if (onSelect != null) {
              onSelect(e, {
                id: jsonData.data.id,
                name: `${jsonData.data.name.first} ${jsonData.data.name.last}`
              });
            }

            setFormData({
              firstName: "",
              middleName: "",
              lastName: "",
              birthDate: "",
              deathDate: "",
              gender: "",
            });
          })
          .catch(error => {
            console.log("failed to make api call");
            setResultMessage("Failed to create person");
          })

        console.log("Submit");
      };

    return (
        <>
            <CreatePersonPresentation formData={formData} 
                                      onChange={handleChange} 
                                      onSubmit={handleSubmit} 
                                      pageType={pageType}
                                      resultMessage={resultMessage}
            />
        </>
    )
}