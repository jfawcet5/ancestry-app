import React, { useState, useEffect } from 'react';

import SearchBar from '../../person/SearchPersonPage/searchBar';
import PopupModal from '../../../shared/components/PopupModal';

import styles from "./TreeView.module.css";


function ControlPanel() {
    return (
        <form className={styles.searchFilterContainer}>
            <input type="text" name="firstName" value="" placeholder="first name" onChange={null}></input>
            <input type="text" name="lastName" value="" placeholder="last name" onChange={null}></input>
            <button onClick={null}>Search</button>
        </form>
    )
}


export default function TreeViewPresentation({personData,
                                                controlPanelOpen, 
                                                setControlPanelOpen,
                                                searchResults=[],
                                                setSearchResults,
                                                searchModalOpen,
                                                setSearchModalOpen,
                                                handleSave,
                                                onSelect,
                                                onRelationChange,
                                                onCancel}) {
    return (
        <>
            <div>
                {controlPanelOpen && <SearchBar onSetSearchResults={setSearchResults}>
                    <PopupModal label="Search Results" isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false) }>
                        <ul>
                            {searchResults.map((item) => <li key={item.id}>
                                                            <button key={item.id} onClick={() => onSelect(item.id)}>{item.name}</button>
                                                        </li>)
                            }
                        </ul>
                    </PopupModal>
                </SearchBar>
                }
                <button onClick={() => {setControlPanelOpen(!controlPanelOpen)}}>---</button>
            </div>
        </>
    );
}