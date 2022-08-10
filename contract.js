const Web3 = require("web3");
const MyToken = require("./build/contracts/MyToken.json");
async function run() {
  const web3 = new Web3("http://127.0.0.1:8545");

  const accounts = await web3.eth.getAccounts();

  const myToken = new web3.eth.Contract(
    MyToken.abi,
    "0xaa07A62cc3f721bab65d489D77376d29FCc9F810"
  );

  //  2 things

  // view function.

  const decimals = await myToken.methods.decimals().call();
  console.log("decimals", decimals);

  const balance = await myToken.methods.balanceOf(accounts[0]).call();
  console.log("balance", balance);
}

run();
