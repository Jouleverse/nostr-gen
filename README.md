# nostr.json generator

## Requirements

1. Iterate through all bound JNS. (JNS NFT)
2. Check its correspondant npub key. (JNSDAOV SBT)
3. Generate nostr.json with key:value = JNS:hex(npub).

## Possible usage

1. Pull the docker image with nodejs

```
$ docker pull node
```

2. Start the container

```
$ docker run -v ~/nostr-gen:/ng --name 'nostr-gen' -it node /bin/bash
```

3. (in docker container) Install etherjs package

```
# cd /ng
# npm install etherjs
# ^D (exit)
```

4. Restart the container

```
$ docker start nostr-gen
```

5. Run checkupdate.sh

```
$ docker exec nostr-gen /ng/checkupdate.sh
```

## Crontab  setup

0 * * * * docker exec nostr-gen /ng/checkupdate.sh

## Revisions

rev 2: 2023.11.2 evan.j - use docker

rev 1: 2023.3.2 evan.j seed.j

## Contributors

seed.j evan.j

