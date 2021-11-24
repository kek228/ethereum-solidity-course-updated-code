const HDWalletProvider = require("@truffle/hdwallet-provider");
var Contract = require('web3-eth-contract');

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: ""
    },
    providerOrUrl: "https://rinkeby.infura.io/v3/qwerty"
});

const manager = "0x99D9B601f1226ce5E4Ff153Cc852689766Ec38E4"
const players = ["0xA483e34a8c8Bc71A844393802640bc63bDd00468", "0x81F0b7a01d914A1464F78232Ab2e5C27C228857C"]


const Web3 = require("web3");
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

const play = async () => {

    const lottery_abi=  [
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
    ]

    let lottery = new web3.eth.Contract(lottery_abi, '0xFaf56AB67734B54BBf77Fb8547776E41A7066E7A', )
    console.log(lottery.options.address)
    let fetched_mngr = await lottery.methods.manager().call({
        from: players[0]
    });
    console.log(`manager: ${manager}`)

    // await enterPlayerInLottery(lottery, players[0], web3, "0.02");
    // await enterPlayerInLottery(lottery, players[1], web3, "0.02");


    const fetched_players = await lottery.methods.getPlayers().call({
        from: manager
    });
    console.log(fetched_players)

    // play_res = await lottery.methods.pickWinner().send({
    //     from: manager
    // });
    //
    // console.log(`play_res: ${play_res}`)

    // for (let player in players) {
    //     let res = await lotteryContract.methods.enter().send({
    //         from: player,
    //         value: web3.utils.toWei(0.02, "ether")
    //     });
    //     console.log('check')
    //     console.log(`res: ${res}`)
    // }
    //

    // const accounts = await web3.eth.getAccounts();
    // console.log(`accounts: ${accounts} len: ${accounts.length}`)
    // for (let i = 0; i < accounts.length; ++i) {
    //     if(accounts[i] in players) {
    //
    //     } else if (accounts[i] == manager) {
    //
    //     }
    // }
};

play()

// AFTER all, by balance seems like this guy won: https://rinkeby.etherscan.io/address/0xa483e34a8c8bc71a844393802640bc63bdd00468
// but why I don't see incoming transaction ???
