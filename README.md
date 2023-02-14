# nostr.json generator

## Requirements

1. Iterate through all bound JNS. (JNS NFT)
2. Check its correspondant npub key. (JNSDAOV SBT)
3. Generate nostr.json with key:value = JNS:hex(npub).

## Possible usage

node index.js > /path/to/nostr.json

