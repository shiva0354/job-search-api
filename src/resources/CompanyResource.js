export const CompanyProfile = (data) => {
    return {
        _id: data._id,
        name: data.name,
        email: data.email,
        location: data.location,
        about: data.about,
        logo: data.logo
    }
}

export const CompanyList = (data) => {
    return data.map(({ _id, name, email, location, about, logo }) => {
        return {
            _id,
            name,
            email,
            location,
            about,
            logo
        }
    })
}
