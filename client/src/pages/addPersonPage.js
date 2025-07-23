// src/components/PersonForm.js
import React, { useState } from 'react';

const PersonForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    deathDate: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create person');
      }

      const result = await response.json();
      setMessage(`Successfully created person with ID: ${result.data.id}`);
      setFormData({ firstName: '', lastName: '', birthDate: '', deathDate: '' });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Create a New Person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Birth Date: </label>
          <input 
            type="date" 
            name="birthDate" 
            value={formData.birthDate}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Death Date: </label>
          <input 
            type="date" 
            name="deathDate" 
            value={formData.deathDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Person</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PersonForm;
