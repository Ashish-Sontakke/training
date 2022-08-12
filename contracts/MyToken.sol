// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyToken {
    address owner;

    mapping(address => uint256) balances;

    mapping(address => mapping(address => uint256)) isAllowed;

    event Transfer(address owner, address to, uint256 amount);

    uint256 totalSupply = 100;

    string public name;
    string public symbol = "MT";

    constructor() {
        owner = msg.sender;
        name = "MyToken";
        balances[msg.sender] = totalSupply;
    }

    // account1 => account2
    function sendTO(address to) public payable {
        payable(to).transfer(msg.value);
    }

    function alwaysFails() public pure {
        require(false, "ERR MSG");
    }

    function decimals() public pure returns (uint8) {
        return 0;
    }

    function transfer(address to, uint256 amount) public {
        require(to != address(0), "Invalid address");
        uint256 currentBalance = balances[msg.sender];
        require(currentBalance >= amount, "not enough balance");
        balances[to] += amount;
        balances[msg.sender] -= amount;
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public {
        require(to != address(0), "Invalid address");
        uint256 allowedAmount = isAllowed[from][msg.sender];
        require(allowedAmount >= amount, "not allowrd");
        uint256 currentBalance = balances[from];
        require(currentBalance >= amount, "not enough balance");
        balances[to] += amount;
        balances[from] -= amount;
        isAllowed[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
    }

    function approve(address user, uint256 amount) public {
        isAllowed[msg.sender][user] = amount;
    }

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        return isAllowed[_owner][_spender];
    }
}
