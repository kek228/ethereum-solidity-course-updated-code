// Load environment variables.
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const network = process.env.RINKEBY_ENDPOINT;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: ""
  },
  providerOrUrl: "https://rinkeby.infura.io/v3/"
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`accounts: ${accounts} len: ${accounts.length}`)
  // console.log("Attempting to deploy from account", accounts[0]);

  // const result = await new web3.eth.Contract(abi)
  //   .deploy({ data: "0x" + evm.bytecode.object })
  //   .send({ from: accounts[0] });
  //
  // console.log("Contract deployed to", result.options.address);
  // provider.engine.stop();
};

deploy();
// 0xFaf56AB67734B54BBf77Fb8547776E41A7066E7A deployed

// 0x99D9B601f1226ce5E4Ff153Cc852689766Ec38E4,
// CANNOT FIND THESE HERE: https://rinkeby.etherscan.io/ ???
// 0xA483e34a8c8Bc71A844393802640bc63bDd00468,
// 0x81F0b7a01d914A1464F78232Ab2e5C27C228857C,
// 0x4EA74e200c8A3F717221dF56C0c333f51e22531D,
// 0x4E79908165c9350Ba142B03dfe6842b0E8F9345C,
// 0x7fED725134CbC5C285e7fbACB050d9072Bab13c7,
// 0x91cf69B4E6ce7403EfbE17d095e5Ff29CB1524a3,
// 0x3f3F52a9B5Ff28aE105CaFb5b23165b4e4BD42A2,
// 0x2961aEad83d1F112E0D967F3b5aa822114a8E17E,
// 0x3F3b33770712800749Bf54747D2e58d5eAd0e41A