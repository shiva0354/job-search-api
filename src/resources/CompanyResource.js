import { appConfig } from '../config/AppConfig.js'

const handle = (company) => {
    return {
        _id: company._id,
        name: company.name,
        email: company.email,
        location: company.location,
        about: company.about,
        logo: company.logo ? appConfig.app_url + '/' + company.logo : ''
    }
}

export const make = (company) => {
    return handle(company)
}

export const collection = (companys) => {
    return companys.map((company) => {
        return handle(company)
    })
}
