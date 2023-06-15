// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingContract {



    address public owner;
    uint256 public totalStaked;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public lastStakeTime;

    uint256 public constant APY = 5; // 5% annual interest rate
    uint256 public constant COMPOUND_INTERVAL = 1 days; // Compound interest every day

    event Staked(address  account, uint256 amount);
    event Unstaked(address  account, uint256 amount);





    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }



    function stake(uint256 amount) external payable {
        require(amount > 0, "Staked amount must be greater than zero");
        balances[msg.sender] += amount;
        totalStaked += amount;
        lastStakeTime[msg.sender] = block.timestamp;

        emit Staked(msg.sender, amount);
    }




    function unstake(uint256 amount) external {
        require(amount > 0, "Unstake amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient staked balance");

        uint256 interest = calculateInterest(msg.sender);
        uint256 totalAmount = amount + interest;

        balances[msg.sender] -= amount;
        totalStaked -= amount;

        // Transfer the unstaked amount + interest to the caller
        (bool success, ) = payable(msg.sender).call{value: totalAmount}("");
        require(success, "Failed to transfer funds");

        emit Unstaked(msg.sender, amount);
    }




    function calculateInterest(address account) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - lastStakeTime[account];
        uint256 n = COMPOUND_INTERVAL / timeElapsed; // Number of times interest compounded in a given time interval
        uint256 r = APY * n / 365 days; // APY is calculated based on the number of days since last stake

        uint256 principal = balances[account];
        uint256 exponent = n * timeElapsed / COMPOUND_INTERVAL;
        uint256 interest = principal * (uint256(1e18) + r)**exponent / uint256(1e18) - principal;

        return interest;
    }




    function withdrawInterest() external {
        uint256 interest = calculateInterest(msg.sender);
        require(interest > 0, "No interest available to withdraw");

        // Transfer the interest to the caller
        (bool success, ) = payable(msg.sender).call{value: interest}("");
        require(success, "Failed to transfer funds");
    }



    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }



    function getTotalStaked() external view returns (uint256) {
        return totalStaked;
    }
}
