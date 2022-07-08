const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage 

  beforeEach(async function() {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should return the new greeting once it's changed", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = '0'
    assert.equal(currentValue.toString(),expectedValue)
  });

  it("should update when store is called", async function () {
    const expectedValue = '7'
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    assert.equal(updatedValue.toString(),expectedValue)
  })

});
