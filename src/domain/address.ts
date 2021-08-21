import { buildUserNameContextType, buildUserNameParamsType } from "../utils"

export const generateAddress = (usernameTemplate: string, domain: string, context: buildUserNameContextType): string => {
    const params: buildUserNameParamsType = {
        '${url.hostname}': context.url ? context.url.hostname : '[failed to get uri.hostname]',
        '${url.href}': context.url ? context.url.href : '[failed to get url.href]',
        '${date}': `${context.date.getFullYear()}${String(context.date.getMonth() + 1).padStart(2, '0')}${String(context.date.getDate()).padStart(2, '0')}${String(context.date.getHours()).padStart(2, '0')}${String(context.date.getMinutes()).padStart(2, '0')}${String(context.date.getSeconds()).padStart(2, '0')}`,
    }
    const userName = buildUserName(usernameTemplate, params)

    return `${userName}@${domain}`
}

export const buildUserName = (template_string: string, params: buildUserNameParamsType): string => {
    let userName = template_string

    Object.entries(params).forEach(([key, value]) => {
        userName = userName.replace(key, value)
    })

    return userName
}