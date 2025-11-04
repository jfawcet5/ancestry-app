import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import styles from "./TreeView.module.css";

import { transformSearchResult } from '../../../shared/utilities/transform';

import TreeViewPresentation from './treeViewPresentation';
import SearchPersonPage from '../../person/SearchPersonPage';

const ENDPOINT = process.env.REACT_APP_API_URL;


const people = {
    a: { id: "a", name: "Alice", parents: ["c", "d"], children: ["b", "e", "f", "g", "h"] },
    b: { id: "b", name: "Bob", parents: ["a"], children: [] },
    c: { id: "c", name: "Carol", parents: [], children: ["a"] },
    d: { id: "d", name: "David", parents: [], children: ["a"] },
    e: { id: "e", name: "Eve", parents: ["a"], children: [] },
    f: { id: "f", name: "Fabio", parents: ["a"], children: ["i"] },
    g: { id: "g", name: "Gloria", parents: ["a"], children: [] },
    h: { id: "h", name: "Harry", parents: ["a"], children: [] },
    i: { id: "i", name: "Ian", parents: ["f"], children: [] },
}




export default function ViewTreePage() {
    const [controlPanelOpen, setControlPanelOpen] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchModalOpen(true);
        setSearchResults(results);
    };

    const handleSelection = (id) => {
        console.log("selected: ", id);
        setSearchModalOpen(false);

        fetch(`${ENDPOINT}/api/tree/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`The server responded with status: ${response.status}`);
                }

                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData);
            })
            .catch((error) => {
                console.error(`ERROR! Person search failed: ${error.message}`);
                // Ignore abort errors as they are expected
                if (error.name === "AbortError") return;
            }
        );
    }

    return <div>
        <TreeViewPresentation controlPanelOpen={controlPanelOpen}
                              setControlPanelOpen={setControlPanelOpen}
                              searchModalOpen={searchModalOpen}
                              setSearchModalOpen={setSearchModalOpen}
                              setSearchResults={handleSearchResults}
                              searchResults={searchResults}
                              onSelect={handleSelection}
        />
        <br />
        <ViewTreePage2 />
    </div>;
}










// Demo #2 with scrolling
function ViewTreePage2() {
    const [focusId, setFocusId] = useState("a");
    const focusPerson = people[focusId];
  
    // Compute 2-generation window
    const parents = focusPerson.parents.map(id => people[id]);
    const children = focusPerson.children.map(id => people[id]);

    const maxNodes = Math.max(parents.length, children.length, 1);
    const svgWidth = maxNodes * 150;
  
    // Simple layout coordinates
    const layout = useMemo(() => {
      //const svgWidth = 600;
      const spacing = 150;
      const centerX = svgWidth / 2;
      const focusY = 200;
      const parentY = 100;
      const childY = 300;
  
      const distribute = (arr, y) =>
        arr.map((p, i) => ({
          ...p,
          x: centerX + (i - (arr.length - 1) / 2) * spacing,
          y,
        }));
  
      return {
        parents: distribute(parents, parentY),
        focus: { ...focusPerson, x: centerX, y: focusY },
        children: distribute(children, childY),
      };
    }, [focusPerson]);
  
    // Build edges (lines)
    const edges = [
      ...layout.parents.map(p => ({
        x1: p.x,
        y1: p.y,
        x2: layout.focus.x,
        y2: layout.focus.y,
      })),
      ...layout.children.map(c => ({
        x1: layout.focus.x,
        y1: layout.focus.y,
        x2: c.x,
        y2: c.y,
      })),
    ];
  
    return (
        <div style={{overflowX: "auto", width: "50%"}}>
            <svg width={svgWidth} height="400" style={{ border: "1px solid #ccc" }}>
                {/* Connectors */}
                {edges.map((e, i) => (
                <line
                    key={i}
                    x1={e.x1}
                    y1={e.y1}
                    x2={e.x2}
                    y2={e.y2}
                    stroke="#999"
                    strokeWidth="2"
                />
                ))}
        
                {/* Parents */}
                {layout.parents.map(p => (
                <PersonNode key={p.id} person={p} onClick={() => setFocusId(p.id)}/>
                ))}
        
                {/* Focus person */}
                <PersonNode person={layout.focus} isFocus />
        
                {/* Children */}
                {layout.children.map(c => (
                <PersonNode key={c.id} person={c} onClick={() => setFocusId(c.id)} />
                ))}
            </svg>
        </div>
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


















// Demo #1 displaying basic tree structure in SVG
function ViewTreePage1() {
    const [focusId, setFocusId] = useState("a");
    const focusPerson = people[focusId];
  
    // Compute 2-generation window
    const parents = focusPerson.parents.map(id => people[id]);
    const children = focusPerson.children.map(id => people[id]);
  
    // Simple layout coordinates
    const layout = useMemo(() => {
      const svgWidth = 600;
      const spacing = 150;
      const centerX = svgWidth / 2;
      const focusY = 200;
      const parentY = 100;
      const childY = 300;
  
      const distribute = (arr, y) =>
        arr.map((p, i) => ({
          ...p,
          x: centerX + (i - (arr.length - 1) / 2) * spacing,
          y,
        }));
  
      return {
        parents: distribute(parents, parentY),
        focus: { ...focusPerson, x: centerX, y: focusY },
        children: distribute(children, childY),
      };
    }, [focusPerson]);
  
    // Build edges (lines)
    const edges = [
      ...layout.parents.map(p => ({
        x1: p.x,
        y1: p.y,
        x2: layout.focus.x,
        y2: layout.focus.y,
      })),
      ...layout.children.map(c => ({
        x1: layout.focus.x,
        y1: layout.focus.y,
        x2: c.x,
        y2: c.y,
      })),
    ];
  
    return (
      <svg width="600" height="400" style={{ border: "1px solid #ccc" }}>
        {/* Connectors */}
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="#999"
            strokeWidth="2"
          />
        ))}
  
        {/* Parents */}
        {layout.parents.map(p => (
          <PersonNode key={p.id} person={p} />
        ))}
  
        {/* Focus person */}
        <PersonNode person={layout.focus} isFocus />
  
        {/* Children */}
        {layout.children.map(c => (
          <PersonNode key={c.id} person={c} onClick={() => setFocusId(c.id)} />
        ))}
      </svg>
    );
  }
  
  function PersonNode1({ person, isFocus, onClick }) {
    const size = isFocus ? 70 : 50;
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






/*
function SearchPersonPage1({pageType = "page", onSelect}) {

    const [searchFilters, setSearchFilters] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters(prev => ({
          ...prev,
          [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams(searchFilters).toString();
        fetch(`${ENDPOINT}/api/people?${params}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`The server responded with status: ${response.status}`);
                }

                return response.json();
            })
            .then(jsonData => {
                if (pageType === "modal") {
                    setSearchResults(jsonData.data.map((item) => ({
                        id: item.id,
                        name: `${item.name.first} ${item.name.last}`
                    })));
                    console.log(searchResults);
                }
                else {
                    console.log("set results with transformed data. input: ");
                    console.log(jsonData);
                    console.log(jsonData.data);
                    setSearchResults(jsonData.data);
                }
            })
            .catch((error) => {
                console.error(`ERROR! Person search failed: ${error.message}`);
                // Ignore abort errors as they are expected
                if (error.name === "AbortError") return;
            })
    }

    useEffect(() => {
        if (pageType === "modal") return;

        fetch(`${ENDPOINT}/api/people/`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(jsonData => {
                console.log("Successfully retrieved search results:");
                console.log(jsonData);
                if (pageType === "modal") {
                    setSearchResults(jsonData.data.map((item) => ({
                        id: item.id,
                        name: `${item.name.first} ${item.name.last}`
                    })));
                    console.log(searchResults);
                }
                else {
                    console.log("set results with transformed data. input: ");
                    console.log(jsonData.data);
                    setSearchResults(jsonData.data);
                }
            });
    }, []);

    return <SearchPersonPresentation searchResults={searchResults} 
                                     searchFilters={searchFilters}
                                     onChange={handleChange}
                                     onSubmit={handleSubmit}
                                     pageType={pageType}
                                     onSelect={onSelect}
            />
}

*/