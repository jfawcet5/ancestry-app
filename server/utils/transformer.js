function flattenResponse(data) {
    return;
}

function formatResponse(data) {
    return {
        id: data.id,
        name: {
            first: data.first_name ?? "",
            middle: data.middle_name ?? "",
            last: data.last_name ?? ""
        },
        birth: {
            date: `${data.birth_month ?? 0}/${data.birth_day ?? 0}/${data.birth_year ?? 0}`,
            location: data.birth_location
        },
        death: {
            date: `${data.death_month ?? 0}/${data.death_day ?? 0}/${data.death_year ?? 0}`,
            location: data.death_location
        },
        relations: {
            mother: data.relations?.mother ?? {},
            father: data.relations?.father ?? {},
            spouses: data.relations?.spouses ?? [],
            siblings: data.relations?.siblings ?? [],
            children: data.relations?.children ?? []
        }
    }
}

module.exports = { flattenResponse, formatResponse };