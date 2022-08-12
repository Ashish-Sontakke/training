const Web3 = require("web3");
const MyToken = require("./build/contracts/MyToken.json");
async function run() {
  const web3 = new Web3("http://127.0.0.1:8545");

  const accounts = await web3.eth.requestAccounts();

  const myToken = new web3.eth.Contract(
    MyToken.abi,
    "0xA0A2ce2E5fB35C0Be4fD1c14d87A4e8686f92B0f"
  );

  //  2 things

  // transactions.

  const tx = await myToken.methods
    .transfer(accounts[1], 5)
    .send({ from: accounts[0] });

  // console.log(tx);

  const tx2 = await myToken.methods.sendTO(accounts[1]).send({
    from: accounts[0],
    value: web3.utils.toWei("10"),
  });

  const gasconsumed = await myToken.methods.sendTO(accounts[1]).send({
    from: accounts[0],
    value: web3.utils.toWei("10"),
  });

  console.log("gas consumed", gasconsumed);

  // const callFailedMSG = await myToken.methods.alwaysFails().call();
  // console.log(callFailedMSG);
}

run();

// createTransaction  => send => falis => chargeGas.Contract
// createTransaction => estimatingGas => if(success) => send | else dontSend
