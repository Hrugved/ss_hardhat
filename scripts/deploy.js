
const {ethers,run, network} = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorageFactory.deploy();
  console.log('deploying SimpleStorage...');
  await simpleStorage.deployed()
  console.log("SimpleStorage deployed to:", simpleStorage.address);
  if(network.config.chainId===5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address,[])
  }
  const currentValue = await simpleStorage.retrieve()
  console.log(`current value is: ${currentValue}`);
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`updated value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  try {
     await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args
  })
  }catch(e) {
    if(e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.log(e)
    }
  }
 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
