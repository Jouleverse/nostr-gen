const bech32 = require('./bech32');
const hex = require('./hex');
const jns = require('./jns.nft');
const jnsdaov = require('./jnsdaov.sbt');

const ethers = require('ethers');

const rpcUrl = "http://rpc.jnsdao.com:8502";
const provider = new ethers.JsonRpcProvider(rpcUrl);

async function main() {
	var height = await provider.getBlockNumber();
	console.log(height);
}

main();
