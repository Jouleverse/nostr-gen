const {bech32}= require('./bech32');
const hex = require('./hex');
const jns = require('./jns.nft');
const jnsdaov = require('./jnsdaov.sbt');

const {ethers} = require('ethers');
const {writeFileSync} = require('fs');

//const rpcUrl = "https://rpc.jnsdao.com:8503";
const rpcUrl = "http://rpc.jnsdao.com:8502";
const provider = new ethers.JsonRpcProvider(rpcUrl,3666);

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

	var name2key = { // manual setup for transition...
		"io3art.j": "c72ae5cbf49894988581779a1abc93b02f348ea0d667b7ecf1c6493c59f0f2a8",
		"c.j": "9a7aa4ac2b527f5b9a1348ce9f5d7f9886b40c77e25eda71a23e7d361a824b34",
		"fang.j": "43780b3ef5241fb68ec648db7b93b2ed3332203e7bbf6145ff20993f1564572a",
		"music.j": "b520deb50b5f3ef658995a102f923ee9ec2c1d91f43125cc54a92291933070e2",
		"li17.j": "f0dc2a47f9f735aced3f2fbace2cceac30af0143804157537d86f024064ae491",
		"j.j": "f53c2d864660e3e5f8ad69b2af1f27ff11bf24372655d5dda21944ad0fb5f703",
		"web3.j": "a0c1cc3cbefbb56fb12605008d5b8e3c6ac6b1945afdce350c3db64f628e9a6d",
		"2917.j": "18e3f1eda41578a3594eaea6e1b15cd7a281064853a7926510ff51b3807c5016",
		"sizimao.j": "ccd1c1ff1726d60d3548664da01682b6694a3cd8f7299cbdd079ab4fbe39510c",
		"dashu.j": "afa4b9a0a599efad29989940728aecd5fe1cc26058b6a182b0612d84ed150bc3",
		"zhifei.j": "0628a615f4a1bd2c5c50202b53e157e34acf1155aaa7bb80cad196495fa4544a",
		"forever.j": "5bdf6e5a0b855ce539ebce36686df54766726b7de92fff26daf7155304acf9c9",
		"crypto.j": "f6ac9b8742c0ccd9259737263d1bcecae0f678376eb0503ba580278fa04de0e4",
		"youyouliu.j": "2d680482f060cca665e59b6d890b9e97e7fbc18c9786f05fd152b2fc6e0d4e76",
		"ceiling0.j": "923eb2ed6dd7c2b6622f4e52cb0ca11bdf4af7524a98dc586b78d8322043c933",
		"666.j": "5146919b7c37aca4d4ebf591861d533b52db4793c4a5b05190486c9ba732a3a6",
		"wang.j": "0103cad99177d75198898dfbeed1c23b06cc75ec08c1ac24278bd230114cfcd4",
		"leon.j": "61abd448fbd9440658d25df8fddd17eb33dc8de2d35d889e1a08deaa40f6de51",
		"ahao.j": "4e53f6746915df1fb0a1b36f554ad11a0b3178ecef324bc415ad3fe0c20c4704",
		"geoffrey.j": "0acb350093582552d9ae0119a1835037dee406675fd6a0e6670e95f42ce974fa",
		"lan.j": "89996f46ebab964827b9b7b908e29d503aa1e5f0cdd7afbae09688e0a8dfff4f",
		"nfl.j": "759865d93c915e920f3bd3958fb8597a1db577c79833329b000b6d72f74e403d",
		"junbenyu.j": "4030f9811a0c14f671ec54e1021661f57948884af844192972e5971564851932",
		"star.j": "da05b466e86142908a32bfc163d723139fcbce0ad6f21f37d1088ac044381d38",
		"arki.j": "eeeba83bc9fb3cc280da266aab3a451ed13f918f453d7317d5747c459e6d1d56"
	};
	console.log('manually configured names: ', Object.keys(name2key));

	const total = await JNSDAO_V_Contract.totalSupply();

	for (var tokenId=0;tokenId<total;tokenId++){
		var owner = await JNSDAO_V_Contract.ownerOf(tokenId); // todo: handle exception
		console.log('read ', tokenId, ' -> ', owner);
		if (owner) {
			var hexkey = await JNSDAO_V_Contract.keys(owner);  //todo: handle exception
			hexkey = hexkey.slice(2);
			try {
				var jName = await JNS_Contract.addr2name(owner);
				var name = jName + '.j';
				name2key[name] = hexkey;
				console.log('wrote ', name, ' => ', hexkey);
			} catch (e) { // must catch, because of jns not bound exception
				console.log('addr2name error: ', e);
			}
		}
	}

	//order by key
	const ordered = Object.keys(name2key).sort().reduce(
		(obj, key) => {
			obj[key] = name2key[key];
			return obj;
		},
		{}
	);
	const output = { "names": ordered };
	//write to file
	saveJson(output);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
