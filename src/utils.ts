export const isHTMLTextAreaElement = (x: any): x is HTMLTextAreaElement =>
    typeof x === 'object' && 'value' in x


export interface buildUserNameContextType {
    [key: string]: string,
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

export const buildUserNameContext = (tab: chrome.tabs.Tab): buildUserNameContextType => {
    const now = new Date()
    const dateString = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    let result: buildUserNameContextType = {
        '${fixed}': 'fixed',
        '${date}': dateString,
    }

    try {
        const url = buildURLFromTab(tab)
        result['${url.hostname}'] = url.hostname
        result['${url.href}'] = url.href
    } catch (error) {
        result['${url.hostname}'] = '[failed to get url.hostname]'
        result['${url.href}'] = '[failed to get url.href]'
    }


    return result
}