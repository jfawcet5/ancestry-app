export function flattenResponse(data) {
    return;
}

export function generateOutputPayload(data) {
    return {
        id: data.id,
        name: {
            first: data.first_name ?? "",
            middle: data.middle_name ?? "",
            last: data.last_name ?? ""
        },
        birth: {
            date: `${data.birth_year ?? ''}/${data.birth_month ?? ''}/${data.birth_day ?? ''}`,
            location: data.birth_location
        },
        death: {
            date: `${data.death_year ?? ''}/${data.death_month ?? ''}/${data.death_day ?? ''}`,
            location: data.death_location
        },
        relations: {
            mother: data.relations?.mother ?? {},
            father: data.relations?.father ?? {},
            spouses: data.relations?.spouses ?? [],
            siblings: data.relations?.siblings ?? [],
            children: data.relations?.children ?? []
        },
        ...data
    }
}

function extractDate(dateString) {
    if (dateString == null) {
        return {};
    }

    // Expecting format: "yyyy-mm-dd"
    const values = dateString.split("/");
    return {
        year: values[0],
        month: values[1] ? values[1] : "",
        day: values[2] ? values[2] : ""
    };
}

export function parseInputJson(data) {
    const birthDate = extractDate(data.birthDate);
    const deathDate = extractDate(data.deathDate);
    return {
        ...(data.firstName && {first_name: data.firstName}),
        ...(data.middleName && {middle_name: data.middleName}),
        ...(data.lastName && {last_name: data.lastName}),
        ...(birthDate.year && {birth_year: birthDate.year}),
        ...(birthDate.month && {birth_month: birthDate.month}),
        ...(birthDate.day && {birth_day: birthDate.day}),
        ...(deathDate.year && {death_year: deathDate.year}),
        ...(deathDate.month && {death_month: deathDate.month}),
        ...(deathDate.day && {death_day: deathDate.day}),
        ...(data.mother && {mother: data.mother}),
        ...(data.father && {father: data.father}),
        ...(data.removals && {removals: [...data.removals]}),
        ...(data.additions && {additions: [...data.additions]})
    }
}

//export default { flattenResponse, generateOutputPayload, parseInputJson };