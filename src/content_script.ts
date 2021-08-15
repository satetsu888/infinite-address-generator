import { isHTMLTextAreaElement } from './utils'

chrome.runtime.onMessage.addListener((message, _sender) => {
    switch (message.action) {
        case 'paste_address':
            const activeElement = document.activeElement
            console.log(message)
            if (isHTMLTextAreaElement(activeElement)) {
                console.debug("set address")
                activeElement.dispatchEvent(new Event('focus', { bubbles: true }));
                activeElement.value = message.params.address
                activeElement.dispatchEvent(new Event('input', { bubbles: true }));
            } else {
                console.debug("element type mismatch?")
                console.debug(activeElement)
            }
    }
})