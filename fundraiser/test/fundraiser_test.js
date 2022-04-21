const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", (accounts) => {
  let fundraiser = null;
  const name = "beneficiary name";
  const website = "beneficiary.org";
  const imageUrl = "beneficiary.png";
  const description = "beneficiary description";
  const beneficiary = accounts[0];
  const owner = accounts[1];

  describe("initialization", () => {
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
});
