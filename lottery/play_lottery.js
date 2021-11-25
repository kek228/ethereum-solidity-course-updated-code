const HDWalletProvider = require("@truffle/hdwallet-provider");
var Contract = require('web3-eth-contract');

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: ""
    },
    providerOrUrl: ""
});

const manager = "0x99D9B601f1226ce5E4Ff153Cc852689766Ec38E4"
// additional accounts I created in my Metamask
const players = ["0xA483e34a8c8Bc71A844393802640bc63bDd00468", "0x81F0b7a01d914A1464F78232Ab2e5C27C228857C"]


const Web3 = require("web3");
const assert = require("assert");
const web3 = new Web3(provider);

async function enterPlayerInLottery(
    lotteryContract,
    playerAddress,
    web3Instance,
    etherAmount
) {
    await lotteryContract.methods.enter().send({
        from: playerAddress,
        value: etherAmount ? web3Instance.utils.toWei(etherAmount, "ether") : 0
    });
}

// адрес и abi должны быть твои
const lottery_abi =  [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "enter",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPlayers",
        "outputs": [
            {
                "internalType": "address payable[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manager",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "players",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
let lottery = new web3.eth.Contract(lottery_abi, '0xC30CCEc02e106D807D2838CC26F1d142991a59dd');

// after this func checl out in your accounts https://rinkeby.etherscan.io/
const enter_players = async  () => {
    console.log(lottery.options.address)
    let fetched_mngr = await lottery.methods.manager().call({
        from: players[0]
    });
    console.log(`manager: ${fetched_mngr}`)
    assert.strictEqual(fetched_mngr, manager);
    await enterPlayerInLottery(lottery, players[0], web3, "0.02");
    await enterPlayerInLottery(lottery, players[1], web3, "0.02");
    provider.engine.stop();
};

const play = async () => {
    play_res = await lottery.methods.pickWinner().send({
        from: manager
    });
    //
    console.log(`play_res: ${play_res}`)
    provider.engine.stop();
};

if (process.argv[2] === "play") {
    play();
} else if (process.argv[2] === "enter") {
    enter_players();
}
// enter_players()

// AFTER all, by balance seems like this guy won: https://rinkeby.etherscan.io/address/0x81F0b7a01d914A1464F78232Ab2e5C27C228857C
// https://rinkeby.etherscan.io/tx/0xe92b7f2ac43e9fd3ad3d48e76c27b570c14f4f6e24e2570c14cc17dd9f9377d6
// transaction with 0.04 transferring