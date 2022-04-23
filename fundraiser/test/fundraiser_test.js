const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", (accounts) => {
  let fundraiser = null;
  const name = "beneficiary name";
  const website = "beneficiary.org";
  const imageUrl = "beneficiary.png";
  const description = "beneficiary description";
  const beneficiary = accounts[0];
  const owner = accounts[1];

  beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      name,
      website,
      imageUrl,
      description,
      beneficiary,
      owner
    );
  });

  describe("initialization", () => {
    it("gets the beneficiary info", async () => {
      const actualName = await fundraiser.name();
      const actualWebsite = await fundraiser.website();
      const actualimageUrl = await fundraiser.imageUrl();
      const actualDescription = await fundraiser.description();
      const actualBeneficiary = await fundraiser.beneficiary();
      const actualOwner = await fundraiser.owner();

      assert.equal(actualName, name, "names should match");
      assert.equal(actualWebsite, website, "websites should match");
      assert.equal(actualimageUrl, imageUrl, "imageUrls should match");
      assert.equal(actualDescription, description, "descriptions should match");
      assert.equal(
        actualBeneficiary,
        beneficiary,
        "beneficiaries should match"
      );
      assert.equal(actualOwner, owner, "custodians should match");
    });
  });

  describe("setBeneficiary", () => {
    const newBeneficiary = accounts[2];

    it("update beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, { from: owner });

      const actualBeneficiary = await fundraiser.beneficiary();

      assert.equal(
        actualBeneficiary,
        newBeneficiary,
        "beneficiaries should match"
      );
    });

    it("throws an error when called from a non-owner account", async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, { from: accounts[3] });
        assert.fail("update beneficiary was not restricted by only owner");
      } catch (error) {
        const expectedError = "Ownable: caller is not the owner";
        const actualError = error.reason;

        assert.equal(expectedError, actualError, "should not be permited");
      }
    });
  });

  describe("making donations", () => {
    const value = web3.utils.toWei("0.0289");
    const donor = accounts[2];

    it("increases myDonationsCount", async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });

      assert(
        currentDonationsCount,
        0,
        "should have 0 donations at the beginning"
      );

      await fundraiser.donate({ from: donor, value });

      const newDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });

      assert.equal(
        newDonationsCount,
        1,
        "should increase the donations count to one"
      );
    });

    it("includes donation in myDonations", async () => {
      await fundraiser.donate({ from: donor, value });
      const { values, dates } = await fundraiser.myDonations({ from: donor });

      assert.equal(value, values[0], "values should match");
      assert(dates[0], "date should be present");
    });

    it("increases the totalDonations amount", async () => {
      const currentTotalDonations = await fundraiser.totalDonations();
      await fundraiser.donate({ from: donor, value });
      const newTotalDonations = await fundraiser.totalDonations();

      const diff = newTotalDonations - currentTotalDonations;

      assert.equal(diff, value, "difference should match the donation value");
    });

    it("increases the donationsCount", async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await fundraiser.donate({ from: donor, value });
      const newDonationsCount = await fundraiser.donationsCount();

      const diff = newDonationsCount - currentDonationsCount;

      assert.equal(1, diff, "donationsCount should increment by 1");
    });

    it("emits the DonationReceived event", async () => {
      const tx = await fundraiser.donate({ from: donor, value });
      const expectedEvent = "DonationReceived";
      const actualEvent = tx.logs[0].event;

      assert.equal(expectedEvent, actualEvent, "events should match");
    });
  });
});
