// Load environment variables.
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const network = process.env.RINKEBY_ENDPOINT;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: network // node-url. We use 1 from https://infura.io/dashboard
});

const web3 = new Web3(provider);
const message = "Hi there!";

const deploy = async () => {
  // there are may be many accounts generated with one seed-phrase
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: "0x" + evm.bytecode.object, arguments: [message] })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
