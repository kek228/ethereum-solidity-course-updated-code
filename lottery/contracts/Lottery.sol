// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Lottery {
    // As of Solidity 0.5.0 the `address` type was split into `address` and
    // `address payable`, where only `address payable` provides the transfer
    // function. We therefore need to explicity use the `address payable[]`
    // array type for the players array.
    address public manager;
    // array -> dynamic array (reference type)
    address payable[] public players; // [] dynamic array, int[3] -> static

    // As of Solidity 0.5.0 constructors must be defined using the `constructor`
    // keyword.
    //
    // As of Solidity 0.7.0 visibility (public / external) is not needed for
    // constructors anymore.
    constructor() {
        // msg object exists every time any contact method invoked by
        // msg.gas amount of gas current function invocation has available
        // msg.value eth number in wei, which has been sent with func invocation
        manager = msg.sender;
    }

    // payable -> when func called, some eth might be sent
    function enter() public payable {
        // Note: Although optional, it's a good practice to include error messages
        // in `require` calls.
        require(
            msg.value > .01 ether,
            "A minimum payment of .01 ether must be sent to enter the lottery"
        );

        // As of Solidity 0.8.0 the global variable `msg.sender` has the type
        // `address` instead of `address payable`. So we must convert msg.sender
        // into `address payable` before we can add it to the players array.
        players.push (payable(msg.sender));
    }

    function random() private view returns (uint256) {
        // For an explanation of why `abi.encodePacked` is used here, see
        // https://github.com/owanhunte/ethereum-solidity-course-updated-code/issues/1
        // solidity does not have random generator
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.number, players) // abi.encodePacked local string concat
                )
            );
    }

    function pickWinner() public onlyOwner {
        if(players.length == 0) {
            return;
        }
        uint256 index = random() % players.length;

        // As of Solidity 0.4.24 at least, `this` is a deprecated way to get the address of the
        // contract. `address(this)` must be used instead.
        address contractAddress = address(this);

        players[index].transfer(contractAddress.balance);
        players = new address payable[](0);
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    modifier onlyOwner() {
        require(msg.sender == manager, "Only owner can call this function.");
        _;
    }
}
