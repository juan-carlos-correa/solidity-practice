const GreeterContract = artifacts.require("Greeter");

contract("Greeter", async (accounts) => {
  it("has been deployed successfully", async () => {
    const greeter = await GreeterContract.deployed();
    assert(greeter, "contract was not deployed");
  });

  describe("greet()", () => {
    it("returns Hello World", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "Hello World";
      const actual = await greeter.greet();
      assert.equal(expected, actual, "greeted with Hello World");
    });
  });

  describe("owner()", () => {
    it("returns the address of the owner", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      assert(owner, "the current owner");
    });

    it("matches the address that originally deployed the contract", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      const expected = accounts[0];
      assert.equal(
        owner,
        expected,
        "matches address used to deploy the contract"
      );
    });
  });
});

contract("Greeter: update greeting", async (accounts) => {
  describe("when message is ent by the owner", () => {
    it("sets greeting to passed string", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "The owner changed the message";

      await greeter.setGreeting(expected);

      const actual = await greeter.greet();

      assert.equal(expected, actual, "greeting updated");
    });
  });

  describe("when message is sent by another account", () => {
    it("does not set the greeting", async () => {
      const greeter = await GreeterContract.deployed();

      try {
        await greeter.setGreeting("not the owner", { from: accounts[1] });
      } catch (e) {
        const errorMessage = "Ownable: caller is not the owner";
        assert.equal(e.reason, errorMessage, "greeting should not update");
        return;
      }

      assert(false, "greeting should not update");
    });
  });
});
