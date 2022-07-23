import fs from "fs";
import * as zksync from "zksync-web3";
import * as ethers from "ethers";

const PRIVATE_KEY = fs.readFileSync(".secret").toString() // this file is hidden, create a .secret file with gitignore
const CONTRACT_ADDRESS = "0x752475894Ac574A8dE1cB42318AcFb30377E383C"

const contract = require("../artifacts-zk/contracts/Greeter.sol/Greeter.json");

// Currently, only one environment is supported.
const syncProvider = new zksync.Provider("https://zksync2-testnet.zksync.dev");
const ethProvider = ethers.getDefaultProvider("goerli");

const signer = new zksync.Wallet(PRIVATE_KEY, syncProvider, ethProvider);

const greeterContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer); 

async function main() {

    const newGreeting = "ayeeeeeeeeeee";
    const setNewGreetingHandle = await greeterContract.setGreeting(newGreeting);
    await setNewGreetingHandle.wait();
  
    const newGreetingFromContract = await greeterContract.greet();
    if (newGreetingFromContract == newGreeting) {
      console.log(`Contract greets us with ${newGreeting}!`);
    } else {
      console.error(`Contract said something unexpected: ${newGreetingFromContract}`);
    }

}

main() 
  .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    }
  )