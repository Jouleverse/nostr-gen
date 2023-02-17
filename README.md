# nostr.json generator

## Requirements

1. Iterate through all bound JNS. (JNS NFT)
2. Check its correspondant npub key. (JNSDAOV SBT)
3. Generate nostr.json with key:value = JNS:hex(npub).

## Possible usage

/path/to/checkupdate.sh

## Crontab  setup

0 * * * * /path/to/nostr-gen/checkupdate.sh > /dev/null

## Contributors

seed.j evan.j

