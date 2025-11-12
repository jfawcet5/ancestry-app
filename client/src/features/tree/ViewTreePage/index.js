import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import styles from "./TreeView.module.css";

import TreeViewPresentation from './treeViewPresentation';

const ENDPOINT = process.env.REACT_APP_API_URL;




export default function ViewTreePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [controlPanelOpen, setControlPanelOpen] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [focusId, setFocusId] = useState();
    const [treeData, setTreeData] = useState({});


    useEffect(() => {
        console.log("selected: ", id);
        
        if (!id) {
            console.log("something went wrong");
            return;
        }

        setFocusId(id);
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
                let treeData_temp = preProcessTreeDataStage1(jsonData.data);
                preProcessTreeDataStage2(treeData_temp);
                let results = preProcessTreeDataStage3(treeData_temp);
                setTreeData(results);
            })
            .catch((error) => {
                console.error(`ERROR! Person search failed: ${error.message}`);
                // Ignore abort errors as they are expected
                if (error.name === "AbortError") return;
            }
        );
    }, [id]);

    const handleSearchResults = (results) => {
        setSearchModalOpen(true);
        setSearchResults(results);
    };

    const handleSelection = (id) => {
        navigate(`/treeview/${id}`, {replace: true});
    }

    return <div>
        <TreeViewPresentation controlPanelOpen={controlPanelOpen}
                              setControlPanelOpen={setControlPanelOpen}
                              searchModalOpen={searchModalOpen}
                              setSearchModalOpen={setSearchModalOpen}
                              setSearchResults={handleSearchResults}
                              searchResults={searchResults}
                              onSelect={handleSelection}
                              treeFocusId={focusId}
                              treeViewData={treeData}
        />
    </div>;
}

function preProcessTreeDataStage1(data) {
    let groups = [];
    // iterate through the children to generate groups
    for (let item of data.gen2) {
        let temp = item.parents.sort();
        let groupId = temp.join("-");
        let group = groups.find(item => item.id === groupId);
        if (!group) {
            let newGroup = {
                id: groupId,
                children: [{
                    id: item.id,
                    key: groupId + item.id, // unique key identifier since parents can be duplicated
                    name: item.name,
                    children: item.children
                }],
                parents: [],
                shapes: {
                    backgroundRects: [],
                    connectors: [],
                    polygons: []
                }
            };

            for (let parentid of item.parents) {
                newGroup.parents.push({id: parentid})
            }

            groups.push(newGroup)
        }
        else {
            group.children.push({
                id: item.id,
                key: groupId + item.id,
                name: item.name,
                children: item.children
            });
        }
    }

    for (let group of groups) {
        for (let parent of group.parents) {
            console.log(parent);
            let parentData = data.gen1.find(item => item.id == parent.id);
            console.log(parentData);
            if (parentData) {
                parent.name = parentData.name;
                parent.parents = parentData.parents;
            }
        }
    }

    console.log(groups);
    
    return {
        groups: groups,
        radius: 40
    }
}

function preProcessTreeDataStage2(data) {
    // Calculate positions of each node
    const gen1_y = 150;
    const gen2_y = 300;
    let x_pos = 0;
    let radius = data.radius;
    let padding = 5;
    let totalWidth = 5;
    // iterate through each of the groups
    for (let group of data.groups) {
        const childCount = group.children.length;
        const parentCount = group.parents.length;
        const groupNodeWidth = Math.max(childCount, parentCount);

        let groupTotalWidth = (groupNodeWidth * radius * 2) + ((groupNodeWidth + 1) * padding * 2);

        totalWidth += groupTotalWidth;

        let centerX = Math.floor(groupTotalWidth / 2);

        console.warn("Populating parent positions");

        let p_x = x_pos + centerX - calculateOffset(radius, padding / 2, parentCount);

        console.log(`parent start x: ${p_x}`)

        // Iterate through parents and set positions
        for (let parent of group.parents) {
            parent.x = p_x;
            parent.y = gen1_y;

            // If this parent has parents (the tree continues up) then
            // place an up arrow above this parent
            if (parent.parents != null) {
                console.log(parent.name);

                let points = [
                    [p_x, gen1_y - (radius * 2)],
                    [p_x - radius * 0.5, gen1_y - radius * 3/2],
                    [p_x + radius * 0.5, gen1_y - radius * 3/2]
                ]

                let arrow = {
                    points: points.map(p => p.join(",")).join(" "),
                    id: parent.id
                }

                group.shapes.polygons.push(arrow);
            }

            p_x += padding + (radius * 2);
        }

        // Create background rectangle for the parents
        let pWidth = (parentCount * radius * 2) + ((parentCount + 1) * padding)

        let pRectLeft = x_pos + centerX - (pWidth / 2);
        let pRectTop = gen1_y - radius - padding;

        let parentBackground = {
            x: pRectLeft,
            y: pRectTop,
            width: pWidth,
            height: padding + padding + radius * 2
        }

        group.shapes.backgroundRects.push(parentBackground);

        console.warn("Populating children positions");
        console.log(`total width: ${groupTotalWidth}`);
        console.log(`center X: ${centerX}`);
        console.log(`x position: ${x_pos}`);

        const childStartX = centerX - calculateOffset(radius, padding, childCount);
        console.log(`child start X: ${childStartX}`);

        let c_x = childStartX + x_pos;
        console.log(`absolute start x: ${c_x}`);

        // Iterate through children in the group and set positions
        for (let child of group.children) {
            console.log(child)
            child.x = c_x;
            child.y = gen2_y;

            // If this child has children (tree continues down) the
            // place a down arrow below this child
            if (child.children != null) {
                console.log(child.name);

                let points = [
                    [c_x, gen2_y + (radius * 2)],
                    [c_x - radius * 0.5, gen2_y + radius * 3/2],
                    [c_x + radius * 0.5, gen2_y + radius * 3/2]
                ]

                let arrow = {
                    points: points.map(p => p.join(",")).join(" "),
                    id: child.children[Math.floor(Math.random() * child.children.length)]
                }

                group.shapes.polygons.push(arrow);
            }

            c_x += padding + (radius * 2);
        }

        // Create a background rectangle for the children
        if (childCount > 1) {
            let cWidth = (childCount * radius * 2) + ((childCount + 1) * padding)

            let cRectLeft = x_pos + centerX - (cWidth / 2);
            let cRectTop = gen2_y - radius - padding;

            let childBackground = {
                x: cRectLeft,
                y: cRectTop,
                width: cWidth,
                height: padding + padding + radius * 2
            }

            group.shapes.backgroundRects.push(childBackground)
        }

        // Make a vertical line between the parents and children of this group
        let connector = {
            x1: centerX + x_pos,
            y1: gen1_y + radius + (2 * padding),
            x2: centerX + x_pos,
            y2: gen2_y - radius - (2 * padding)
        }

        console.log('connector');
        console.log(connector);

        group.shapes.connectors.push(connector);

        x_pos += groupTotalWidth + padding;
    }

    //console.log(data);
    // calculate positions of each of the items
    // calculate positions of the connections
    //data.width = 800;
    data.width = totalWidth;
    return data;
}

function preProcessTreeDataStage3(data) {
    // Format tree data for the tree view
    let result = {
        radius: data.radius,
        width: data.width,
        nodes: [],
        rects: [],
        lines: [],
        polygons: []
    }

    for (let group of data.groups) {
        for (let rect of group.shapes.backgroundRects) {
            result.rects.push(rect);
        }

        for (let parent of group.parents) {
            result.nodes.push(parent);
        }

        for (let child of group.children) {
            result.nodes.push(child);
        }

        for (let conn of group.shapes.connectors) {
            result.lines.push(conn);
        }

        for (let poly of group.shapes.polygons) {
            result.polygons.push(poly);
        }

    }

    console.log(result);
    return result;
}



function calculateOffset(radius, padding, nodeCount) {
    console.log("calculate offset");
    console.log(`radius: ${radius}`);
    console.log(`padding: ${padding}`);
    console.log(`nodeCount: ${nodeCount}`);
    const baseOffset = ((nodeCount - 1) * radius) + (((nodeCount - 1) * padding) / 2);
    console.log(`base offset: ${baseOffset}`);
    return baseOffset;
}
