import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ArraySortingExample", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function fixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ArraySortingExample = await ethers.getContractFactory("ArraySortingExample");
    const sorter = await ArraySortingExample.deploy([1,2,3,4,5,6,7,8,9,10]);

    return { sorter, owner, otherAccount };
  }

  it("Slow", async function () {
    const { sorter, owner } = await loadFixture(fixture);

    await sorter.removeSlow(1);

    expect(await sorter.values(0)).to.equal(1);
    expect(await sorter.values(1)).to.equal(3);
    expect(await sorter.values(2)).to.equal(4);
    expect(await sorter.values(3)).to.equal(5);
    expect(await sorter.values(4)).to.equal(6);
    expect(await sorter.values(5)).to.equal(7);
    expect(await sorter.values(6)).to.equal(8);
    expect(await sorter.values(7)).to.equal(9);
    expect(await sorter.values(8)).to.equal(10);
  });

  it("Fast", async function () {
    const { sorter, owner } = await loadFixture(fixture);

    await sorter.removeFast(1);

    expect(await sorter.values(0)).to.equal(1);
    expect(await sorter.values(1)).to.equal(10);
    expect(await sorter.values(2)).to.equal(3);
    expect(await sorter.values(3)).to.equal(4);
    expect(await sorter.values(4)).to.equal(5);
    expect(await sorter.values(5)).to.equal(6);
    expect(await sorter.values(6)).to.equal(7);
    expect(await sorter.values(7)).to.equal(8);
    expect(await sorter.values(8)).to.equal(9);
  });
});
