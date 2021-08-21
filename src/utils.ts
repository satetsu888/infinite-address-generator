export const isHTMLTextAreaElement = (x: any): x is HTMLTextAreaElement =>
    typeof x === 'object' && 'value' in x


export interface buildUserNameContextType {
    url: URL,
    date: Date,
}
export interface buildUserNameParamsType {
    '${url.hostname}': string,
    '${url.href}': string,
    '${date}': string,
}

export const buildURLFromTab = (tab: chrome.tabs.Tab): URL => {
    if (typeof tab === undefined) {
        throw new Error('undefined tab')
    }
    if (typeof tab.url !== 'string') {
        throw new Error('invalid tab.url')
    }
    return new URL(tab.url)
}

export const buildUserNameContextFromTab = (tab: chrome.tabs.Tab): buildUserNameContextType => {
    const now = new Date()

    return {
        url: buildURLFromTab(tab),
        date: new Date(),
    }
}