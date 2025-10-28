export function computePersonDiff(original, edited) {
    const patch = {};
    const relationLists = ["spouses", "children", "siblings"];
    const relations = ["mother", "father"];

    for (const key in edited) {
        if (relations.find(item => item === key)) continue;
        if (relationLists.find(item => item === key)) continue;
        console.log("comparing key: ", key);
        
        console.log(`original: '${original[key]}' - copy: '${edited[key]}'`);
        
        if (edited[key] !== original[key]) {
            console.log(`Difference detected in key: '${key}'`);
            patch[key] = edited[key];
        }
    }

    for (const relation of relations) {
        console.log("comparing relation: ", relation);
        console.log("edited: ");
        console.log(edited[relation]);
        console.log("original: ");
        console.log(original[relation]);
        if (edited[relation] && original[relation]) {
            if (edited[relation].id !== original[relation].id) {
                patch[relation] = edited[relation].id;
            }
        }
    }

    for (const relation of relationLists) {
        console.log("comparing relation: ", relation);
        console.log("edited: ");
        console.log(edited[relation]);
        console.log("original: ");
        console.log(original[relation]);
        const editList = edited[relation] || [];
        const originalList = original[relation] || [];

        const additions = editList.filter(eItem => !originalList.find(oItem => oItem.id === eItem.id)) 
                                  .map(item => ({relationType: relation, ...item}));

        const removals = originalList.filter(oItem => !editList.find(eItem => eItem.id === oItem.id)) 
                                  .map(item => ({relationType: relation, ...item}));
        
        if (additions.length) {
            patch.additions = [...(patch.additions ?? []), ...additions];
        }

        if (removals.length) {
            patch.removals = [...(patch.removals ?? []), ...removals];
        }
    }

    console.log("results");
    console.log(patch);
    return patch;
}