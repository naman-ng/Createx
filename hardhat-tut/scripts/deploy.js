const { ethers } = require('hardhat');
require('dotenv').config({ path: '.env' });
const {} = require('../constants');

async function main() {
  const sampleContract = await ethers.getContractFactory('Sample');

  const deployedSampleContract = await sampleContract.deploy();
  await deployedSampleContract.deployed();

  console.log('Sample Contract Address:', deployedSampleContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
