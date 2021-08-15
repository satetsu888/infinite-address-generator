chrome.storage.sync.set({
    'address.domain': 'example.com',
    'address.usernameTemplate': 'example-${url.hostname}-${fixed}-${date}'
})