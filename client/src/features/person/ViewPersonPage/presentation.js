import React, { useState, useEffect } from 'react';

import PersonHeader from "./personHeader.js";
import RelationSection from './relationSection.js';

export default function ViewPersonPresentation({personData,
                                                headerData, 
                                                isEditMode, 
                                                setIsEditMode, 
                                                handleSave}) {
    return (
        <>
            <PersonHeader personData={headerData} editMode={isEditMode}/>
            <RelationSection relations={personData.relations} isEditable={isEditMode}/>
            <p>{JSON.stringify(personData)}</p>

            <div className='edit-mode-button'>
                {isEditMode ? (
                                <>
                                    <button onClick={() => {setIsEditMode(false)}}>Cancel</button>
                                    <button onClick={handleSave}>Save</button>
                                </>
                              )
                            : <button onClick={() => {setIsEditMode(true)}}>Edit</button>
                }
            </div>
        </>
    );
}