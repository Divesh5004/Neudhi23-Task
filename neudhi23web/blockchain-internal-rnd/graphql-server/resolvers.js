const Web3 = require('web3');
const { Contract } = require('web3-eth-contract');
const TokenContractABI = require('./TokenContractABI.json');

const web3 = new Web3('http://localhost:8545');
const contractAddress = '0x82E53029272b01E741ed722cD8f6C82BE913fC45';
const tokenContract = new Contract(TokenContractABI);
tokenContract.options.address = contractAddress;

const resolvers = {
  Query: {
    getToken: async (_, { id }) => {
      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const totalSupply = await tokenContract.methods.totalSupply().call();

      return { id, name, symbol, totalSupply };
    },

    
  },
  Subscription: {
    transferEvents: {
      subscribe: async () => {
        const subscription = web3.eth.subscribe('logs', {
          address: contractAddress,
          topics: ['0xa9059cbb'],
        });

        return subscription;
      },
      resolve: async (payload) => {
        const event = web3.eth.abi.decodeLog(
          [
            { type: 'address', name: 'from', indexed: true },
            { type: 'address', name: 'to', indexed: true },
            { type: 'uint256', name: 'value' },
          ],
          payload.data,
          payload.topics.slice(1)
        );

        return {
          from: event.from,
          to: event.to,
          value: web3.utils.fromWei(event.value),
        };
      },
    },
  },
};

module.exports = resolvers;
