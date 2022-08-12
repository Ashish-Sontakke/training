// https://rinkeby.infura.io/v3/
const Web3 = require("web3");
const MyToken = require("./build/contracts/MyToken.json");
// 0x27fd1BB58648EcF8791C7e293E5899D5CbDe1Add

async function main() {
  const web3Object = new Web3(
    "https://rinkeby.infura.io/v3/72124dd1ed144ecd9da125351b0a5244"
  );

  const account = web3Object.eth.accounts.privateKeyToAccount(
    "db3ca861d376d53964b6f73668238487694094fdee5f8638b8ace06900b37316"
  );

  console.log(account);

  const myToken = new web3Object.eth.Contract(
    MyToken.abi,
    "0x27fd1BB58648EcF8791C7e293E5899D5CbDe1Add"
  );

  const name = await myToken.methods.name().call();
  console.log("name", name);
}

main();
