import { h, render, FunctionComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'

/** @jsx h */

const Options: FunctionComponent = () => {

    const [domain, setDomain] = useState('example.com');
    const [usernameTemplate, setUsernameTemplate] = useState('example-${url.hostname}-${fixed}-${date}');

    useEffect(() => {
        chrome.storage.sync.get(['address.domain', 'address.usernameTemplate'], (result) => {
            const domain = result['address.domain']
            const usernameTemplate = result['address.usernameTemplate']

            if (typeof (domain) === 'string') setDomain(domain)
            if (typeof (usernameTemplate) === 'string') setUsernameTemplate(usernameTemplate)
        })
    }, []);


    return (
        <div>
            <input type="text" value={usernameTemplate} onChange={(event) => {
                if (event.target instanceof HTMLInputElement) {
                    setUsernameTemplate(event?.target?.value)
                }
            }} />
            @
            <input type="text" placeholder="your domain" value={domain} onChange={(event) => {
                if (event.target instanceof HTMLInputElement) {
                    setDomain(event.target.value)
                }
            }} />

            <button onClick={
                () => {
                    chrome.storage.sync.set({
                        'address.domain': domain,
                        'address.usernameTemplate': usernameTemplate,
                    })
                }
            }
            >Save</button>
        </div >
    )
}

render(<Options />, document.body)