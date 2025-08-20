// Flatten API response for frontend use
export function transformPersonData(apiData) {
    console.log("transform person data");
    console.log(apiData);
    return {
        firstName: apiData.name.first,
        middleName: apiData.name.middle,
        lastName: apiData.name.last,
        mother: apiData.relations.mother,
        father: apiData.relations.father,
        birthDate: apiData.birth.date,
        birthLocation: apiData.birth.location,
        deathDate: apiData.death.date,
        deathLocation: apiData.death.location,
        siblings: apiData.relations.siblings,
        children: apiData.relations.children,
        spouses: apiData.relations.spouses
    };
}


export function transformSearchResult(apiData) {
    console.log("transform person data");
    console.log(apiData);
    return {
        id: apiData.id,
        firstName: apiData.name.first,
        middleName: apiData.name.middle,
        lastName: apiData.name.last,
        birthDate: apiData.birth.date,
        birthLocation: apiData.birth.location,
        deathDate: apiData.death.date,
        deathLocation: apiData.death.location,
    };
}