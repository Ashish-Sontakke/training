const Web3 = require("web3");
const MyToken = artifacts.require("MyToken");

contract("MyToken", async (accounts) => {
  let myToken;

  before(async () => {
    myToken = await MyToken.new();
    console.log("deployed at address:", myToken.address);
  });

  //   async await
  describe("Correct deployment", () => {
    it("has correct name", async () => {
      const name = await myToken.name();
      assert.equal("MyToken", name);
    });

    it("shoud have correct balance", async () => {
      const balance = await myToken.balanceOf(accounts[0]);

      assert.equal("101", balance.toString());
    });
  });

  describe("Transfer Tests", () => {
    it("can transfer", async () => {
      const tx = await myToken.transfer(accounts[1], 5);
      const balance = await myToken.balanceOf(accounts[1]);
      assert.equal(balance.toString(), "5");
    });

    it("can not transfer zero tokens", () => {});
  });
});
