const FundraiserFactoryContract = artifacts.require("FundraiserFactory");
const FundraiserContract = artifacts.require("Fundraiser");

contract("FundraiserFactory: deployment", () => {
  it("has been deployed", async () => {
    const fundraiserFactory = FundraiserFactoryContract.deployed();

    assert(fundraiserFactory, "fundraiser factory was not deployed");
  });
});

contract("FundraiserFactory: createFundraiser", (accounts) => {
  let fundraiserFactory = null;
  const name = "Beneficiary name";
  const url = "beneficiaryname.org";
  const imageUrl = "https://placekitten.com/600/350";
  const description = "Beneficiary description";
  const beneficiary = accounts[1];

  it("increments the fundraisersCount", async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();

    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();

    await fundraiserFactory.createFundraiser(
      name,
      url,
      imageUrl,
      description,
      beneficiary
    );

    const newFundraisersCount = await fundraiserFactory.fundraisersCount();

    assert.equal(
      newFundraisersCount - currentFundraisersCount,
      1,
      "should increment by 1"
    );
  });

  it("emits the FundraiserCreated event", async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();

    const tx = await fundraiserFactory.createFundraiser(
      name,
      url,
      imageUrl,
      description,
      beneficiary
    );

    const expectedEvent = "FundraiserCreated";
    const actualEvent = tx.logs[0].event;

    assert.equal(actualEvent, expectedEvent, "events should match");
  });
});

contract("FundraiserFactory: fundraisers", (accounts) => {
  async function createFundraiserFactory(fundraiserCount, accounts) {
    const factory = await FundraiserFactoryContract.new();
    await addFundraisers(factory, fundraiserCount, accounts);
    return factory;
  }

  async function addFundraisers(factory, count, accounts) {
    const name = "Beneficiary";
    const lowerCaseName = name.toLowerCase();
    const beneficiary = accounts[1];

    for (let i = 0; i < count; i++) {
      await factory.createFundraiser(
        `${name} ${i}`,
        `${lowerCaseName}${i}.com`,
        `${lowerCaseName}${i}.png`,
        `Description for ${lowerCaseName} ${i}`,
        beneficiary
      );
    }
  }

  describe("when fundraisers collection is empty", () => {
    it("returns an empty collection", async () => {
      const factory = await createFundraiserFactory(0, accounts);
      const fundraisers = await factory.fundraisers(10, 0);

      assert.equal(fundraisers.length, 0, "collection should be empty");
    });
  });

  describe("varying limits", async () => {
    let factory = null;

    beforeEach(async () => {
      factory = await createFundraiserFactory(30, accounts);
    });

    it("returns 10 results when limit requested is 10", async () => {
      const fundraisers = await factory.fundraisers(10, 0);

      assert.equal(fundraisers.length, 10, "results size should be 10");
    });

    it("returns 20 results when limit requested is 20", async () => {
      const fundraisers = await factory.fundraisers(20, 0);

      assert.equal(fundraisers.length, 20, "results size should be 20");
    });

    it("returns 20 results when limit requested is 30", async () => {
      const fundraisers = await factory.fundraisers(30, 0);

      assert.equal(fundraisers.length, 20, "results size should be 20");
    });
  });

  describe("varying offset", () => {
    let factory = null;

    beforeEach(async () => {
      factory = await createFundraiserFactory(10, accounts);
    });

    it("contains the fundraiser with the appropriate offset when offset is 0", async () => {
      const fundraisers = await factory.fundraisers(1, 0);
      const fundraiser = await FundraiserContract.at(fundraisers[0]);
      const name = await fundraiser.name();
      assert.ok(await name.includes(0), `${name} did not include the offset`);
    });

    it("contains the fundraiser with the appropriate offset when the offset is 7", async () => {
      const fundraisers = await factory.fundraisers(1, 7);
      const fundraiser = await FundraiserContract.at(fundraisers[0]);
      const name = await fundraiser.name();
      assert.ok(await name.includes(7), `${name} did not include the offset`);
    });
  });
});
