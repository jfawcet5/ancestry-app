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
                                                treeViewData,
                                                treeFocusId,
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
            <div style={{overflowX: "auto", width: "50%"}}>
            
            <svg width={treeViewData.width} height="400" style={{ border: "1px solid #ccc" }}>
                {treeViewData.rects && treeViewData.rects.map((r, i) => (
                    <rect
                        key={i}
                        x={r.x}
                        y={r.y}
                        width={r.width}
                        height={r.height}
                        stroke="#999"
                        strokeWidth="2"
                        fill="#FF0000"
                    />
                    ))
                }
                {treeViewData.lines && treeViewData.lines.map((e, i) => (
                    <line
                        key={i}
                        x1={e.x1}
                        y1={e.y1}
                        x2={e.x2}
                        y2={e.y2}
                        stroke="#999"
                        strokeWidth="2"
                    />
                    ))
                }
                {treeViewData.nodes && treeViewData.nodes.map((item) => <PersonNode key={item.key} person={item}/>)}
            </svg>
        </div>
        </>
    );
}



function PersonNode({ person, isFocus, onClick }) {
    const size = 50;
    const fill = isFocus ? "#ffdd88" : "#cce5ff";
    return (
      <g
        transform={`translate(${person.x}, ${person.y})`}
        onClick={onClick}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        <circle r={size / 2} fill={fill} stroke="#333" strokeWidth="2" />
        <text
          textAnchor="middle"
          y={5}
          style={{ fontFamily: "sans-serif", fontSize: 14 }}
        >
          {person.name}
        </text>
      </g>
    );
}













function TreeViewPresentation2({personData,
    controlPanelOpen, 
    setControlPanelOpen,
    searchResults=[],
    setSearchResults,
    searchModalOpen,
    setSearchModalOpen,
    treeViewData,
    treeFocusId,
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
<div style={{overflowX: "auto", width: "50%"}}>

<svg width={500} height="400" style={{ border: "1px solid #ccc" }}>
{treeViewData.gen1 && treeViewData.gen1.map(c => (
<PersonNode key={c.id} person={c} />
))}
{/* Children */}
{treeViewData.gen2 && treeViewData.gen2.map(c => (
<PersonNode key={c.id} person={c} isFocus={c.id === treeFocusId}/>
))}
</svg>
</div>
</>
);
}