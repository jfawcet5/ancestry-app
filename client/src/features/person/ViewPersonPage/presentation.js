//import React, { useState, useEffect } from 'react';

import PersonHeader from "./personHeader.js";
import RelationSection from './relationSection.js';

export default function ViewPersonPresentation({personData,
                                                permissions,
                                                isEditMode, 
                                                setIsEditMode, 
                                                handleSave,
                                                onSelect,
                                                onRelationChange,
                                                onCancel}) {
    return (
        <>
            <PersonHeader personData={personData} editMode={isEditMode} onSelect={onSelect}/>
            <RelationSection relations={personData} isEditable={isEditMode} onChange={onRelationChange}/>
            <p>{JSON.stringify(personData)}</p>

            {permissions.canEdit && (
                <div className='edit-mode-button'>
                    {isEditMode ? (
                                    <>
                                        <button onClick={onCancel}>Cancel</button>
                                        <button onClick={handleSave}>Save</button>
                                    </>
                                )
                                : <button onClick={() => {setIsEditMode(true)}}>Edit</button>
                    }
                </div>
            )}
        </>
    );
}