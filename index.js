const {bech32}= require('./bech32');
const hex = require('./hex');
const jns = require('./jns.nft');
const jnsdaov = require('./jnsdaov.sbt');

const {ethers} = require('./ethers-5.2');
const {writeFileSync} = require('fs');

const rpcUrl = "https://rpc.jnsdao.com:8503";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl,3666);

function npub2key(npub) {
	var bytes = bech32.fromWords(bech32.decode(npub).words);
	return hex.bytesToHex(bytes)
}

function saveJson(data){
	var content = JSON.stringify(data, null, 2);
	writeFileSync('./nostr.json', content, (error)=>{
		if(error){
			console.error('write err:',error)
			return;
		}
	});

	console.log("write success:", content);
}

async function main() {

	const JNS_Contract = new ethers.Contract(jns.jns_contract_address, jns.jns_ABI, provider);
	const JNSDAO_V_Contract = new ethers.Contract(jnsdaov.jnsdaov_contract_address, jnsdaov.jnsdaov_ABI, provider);

	var name2key;
	var total = await JNSDAO_V_Contract.totalSupply();

	for (var tokenId=0;tokenId<total;tokenId++){
		var owner = await JNSDAO_V_Contract.ownerOf(tokenId); // todo: handle exception
		var npub = await JNSDAO_V_Contract.keys(owner);  //todo: handle exception
		var jName = await JNS_Contract.addr2name(owner); //todo: handle exception
		name2key[jName] = npub2key(npub);
	}

	//write to file
	saveJson(name2key)
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
