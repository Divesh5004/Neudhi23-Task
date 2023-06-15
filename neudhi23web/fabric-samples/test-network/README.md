## Running the test network

You can use the `./network.sh` script to stand up a simple Fabric test network. The test network has two peer organizations with one peer each and a single node raft ordering service. You can also use the `./network.sh` script to create channels and deploy chaincode. For more information, see [Using the Fabric test network](https://hyperledger-fabric.readthedocs.io/en/latest/test_network.html). The test network is being introduced in Fabric v2.0 as the long term replacement for the `first-network` sample.

Before you can deploy the test network, you need to follow the instructions to [Install the Samples, Binaries and Docker Images](https://hyperledger-fabric.readthedocs.io/en/latest/install.html) in the Hyperledger Fabric documentation.




step 1 - curl -sSL https://bit.ly/2ysbOFE | bash -s 2.2.1
step 2 - ./network.sh up createChannel -ca -c mychannel -s couchdb -i 2.2.1
step 3 - paste orgainization folder of /faber-sample/test-net/oraginstaion in explorer folder 
step 4- give permission of orgramization file of in explorer (sudo chmod -R 777 organization). 
step 4 - change and check file path in test-network.json 
step 5 - up explorer 1.1.18 version (docker-compose up) 
step 6 - deploy erc20 contract - (./network.sh deployCC -ccn token_erc20 -ccp ../token-erc-20/chaincode-javascript/ -ccl javascript ) 
step 7 - then follow all command of this url - https://github.com/hyperledger/fabric-samples/tree/main/token-erc-20
curl -sSL https://bit.ly/2ysbOFE | bash -s 2.2.1
