import { buildUserNameContext, buildUserNameContextType } from './utils'

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'root',
        title: 'aaa',
        contexts: ['editable']
    })

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        console.debug("context menu clicked")
        if (!tab?.id) { return }
        console.debug(tab)

        const context: buildUserNameContextType = buildUserNameContext(tab)
        const address: string = await generateAddress(context)
        console.log(address)
        chrome.tabs.sendMessage(tab.id, { action: 'paste_address', params: { address: address } })
    })
})

const DEFAULT_USER_NAME_TEMPLATE = 'default-template'
const DEFAULT_DOMAIN = 'example.com'

const generateAddress = async (context: buildUserNameContextType): Promise<string> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['address.domain', 'address.usernameTemplate'], (data) => {
            const userName = typeof data['address.usernameTemplate'] === 'string' ? buildUserName(data['address.usernameTemplate'], context) : DEFAULT_USER_NAME_TEMPLATE
            const address = typeof data['address.domain'] === 'string' ? `${userName}@${data['address.domain']}` : DEFAULT_DOMAIN
            resolve(address)
        })
    })
}

const buildUserName = (template_string: string, context: buildUserNameContextType): string => {
    let userName = template_string

    Object.entries(context).forEach(([key, value]) => {
        userName = userName.replace(key, value)
    })

    return userName
}
