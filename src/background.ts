import { buildUserNameContextFromTab, buildUserNameContextType } from './utils'
import { generateAddress } from './domain/address'

chrome.contextMenus.create({
    id: 'root',
    title: 'generate address',
    contexts: ['editable']
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.debug("context menu clicked")
    if (!tab?.id) { return }
    console.debug(tab)

    // TODO: データがないときはオプション画面を案内する
    const DEFAULT_USER_NAME_TEMPLATE = 'default-template'
    const DEFAULT_DOMAIN = 'example.com'
    const data = await ((): Promise<any> => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(['address.domain', 'address.usernameTemplate'], (data) => {
                resolve(data)
            })
        })
    })()
    const usernameTemplate = typeof data['address.usernameTemplate'] === 'string' ? data['address.usernameTemplate'] : DEFAULT_USER_NAME_TEMPLATE
    const domain = typeof data['address.domain'] === 'string' ? data['address.domain'] : DEFAULT_DOMAIN

    const context: buildUserNameContextType = buildUserNameContextFromTab(tab)

    const address: string = generateAddress(usernameTemplate, domain, context)
    console.log(address)

    chrome.tabs.sendMessage(tab.id, { action: 'paste_address', params: { address: address } })
})