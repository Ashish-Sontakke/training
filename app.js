const Web3 = require("web3");

// 127.0.0.1:8545

async function main() {
  const web3Object = new Web3("http://127.0.0.1:8545");

  const chainId = await web3Object.eth.net.getId();
  console.log("chainId", chainId.toString());

  const accounts = await web3Object.eth.getAccounts();
  const account = accounts[0];
  console.log(account);

  const balanceBefore = await web3Object.eth.getBalance(account);

  console.log(balanceBefore);

  console.log("balance before", web3Object.utils.fromWei(balanceBefore));

  const tx = await web3Object.eth.sendTransaction({
    from: account,
    to: accounts[1],
    value: web3Object.utils.toWei("5"),
  });

  const balanceAfter = await web3Object.eth.getBalance(account);
  console.log("balance after", web3Object.utils.fromWei(balanceAfter));
}

main();
