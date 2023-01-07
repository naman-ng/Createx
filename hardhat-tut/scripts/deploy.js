const { ethers } = require('hardhat');
require('dotenv').config({ path: '.env' });
// const {} = require('../constants');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contract with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  const contractFactory = await ethers.getContractFactory('VideoMarketplace');
  // no params in constructor
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log('contract VideoMarketplace deployed to address: ', contract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
