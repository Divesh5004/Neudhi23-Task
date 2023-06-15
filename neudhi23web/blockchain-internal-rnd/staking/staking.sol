// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;




contract StakingContract {
    mapping(address => uint256) private balances;
    mapping(address => uint256) private lastStakeTime;
    uint256 private constant interestRate = 10; 
    



    function stake(uint256 amount) external payable  {
        require(amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] == 0, "You can only stake once");
        
        balances[msg.sender] = amount;
        lastStakeTime[msg.sender] = block.timestamp;
    }




    
    function calculateInterest(address account) public view returns (uint256) {
        require(balances[account] > 0, "Account has no balance to calculate interest");
        
        uint256 elapsedTime = block.timestamp - lastStakeTime[account];
        uint256 interest = (balances[account] * interestRate * elapsedTime) / (365 days);
        
        return balances[account] + interest;
    }
    




    function withdraw() external {
        require(balances[msg.sender] > 0, "Account has no balance to withdraw");
        
        uint256 balanceWithInterest = calculateInterest(msg.sender);

        balances[msg.sender] = 0;
        lastStakeTime[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: balanceWithInterest}("");
        require(success, "Transfer failed");
    }
    




    function getStakeBalance(address account) external view returns (uint256) {
        return balances[account];
    }
    




    function getLastStakeTime(address account) external view returns (uint256) {
        return lastStakeTime[account];
    }
}
