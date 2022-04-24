const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

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
