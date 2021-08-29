import { h, render, FunctionComponent } from 'preact'
import { useState, useEffect, useCallback } from 'preact/hooks'
import { css } from 'goober'

import { generateAddress } from './domain/address';
import { buildUserNameContextType } from './utils';


/** @jsx h */

const Options: FunctionComponent = () => {

    const [domain, setDomain] = useState('example.com');
    const [usernameTemplate, setUsernameTemplate] = useState('example-${url.hostname}-${fixed}-${date}');
    const [sampleAddress, setSampleAddress] = useState('');

    useEffect(() => {
        chrome.storage.sync.get(['address.domain', 'address.usernameTemplate'], (result) => {
            const domain = result['address.domain']
            const usernameTemplate = result['address.usernameTemplate']

            if (typeof (domain) === 'string') setDomain(domain)
            if (typeof (usernameTemplate) === 'string') setUsernameTemplate(usernameTemplate)
        })
    }, []);

    useEffect(() => {
        const sampleContext: buildUserNameContextType = {
            url: new URL('https://example.com'),
            date: new Date(),
        }
        setSampleAddress(generateAddress(usernameTemplate, domain, sampleContext))
    }, [usernameTemplate, domain])

    const usernameTemplateChangeCallback = useCallback((event: any) => {
        if (event.target instanceof HTMLInputElement) {
            setUsernameTemplate(event.target.value)
        }
    }, [])

    const domainChangeCallback = useCallback((event: any) => {
        if (event.target instanceof HTMLInputElement) {
            setDomain(event.target.value)
        }
    }, [])


    return (
        <div>
            <input type="text" value={usernameTemplate} onInput={usernameTemplateChangeCallback} />
            @
            <input type="text" placeholder="your domain" value={domain} onInput={domainChangeCallback} />

            {sampleAddress}

            <button className={css`width: 300px;`} onClick={
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