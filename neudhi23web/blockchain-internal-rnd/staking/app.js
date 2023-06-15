
const contractAddress = "0xB7503A92d08474DD23587a77B384a662B89FDF18"; // Replace with the actual staking contract address

// Connect to a web3 provider
async function connectToWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    alert("No Ethereum wallet detected. Please install MetaMask.");
  }
}


// Get the contract instance
async function getContract() {
  const web3 = window.web3;
  const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "calculateInterest",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getLastStakeTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getStakeBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  
  const contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
}


// Stake 
async function stakeTokens() {
  const contract = await getContract();
  const amount = document.getElementById("amountInput").value;
  console.log(amount);
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
console.log(account);
  await contract.methods.stake(amount).send({ from: account });
  alert("Tokens staked successfully!");
}


// Get stake balance
async function getStakeBalance() {
  const contract = await getContract();
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const balance = await contract.methods.getStakeBalance(account).call();
  document.getElementById("balanceResult").innerText = `Stake Balance: ${balance}`;
}





// Get stake balance
async function getLastStakeTime() {
  const contract = await getContract();
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const balance = await contract.methods.getLastStakeTime(account).call();
  document.getElementById("balanceResult1").innerText = `Stake Balance: ${balance}`;
}



// Connect to web3 provider on page load
window.addEventListener("load", async () => {
  await connectToWeb3();
});

