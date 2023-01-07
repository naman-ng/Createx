const { expect } = require('chai')

const { ethers } = require('hardhat')

// Import utilities from Test Helpers
const {
  // BN,
  expectEvent,
  expectRevert,
  // constants,
} = require('@openzeppelin/test-helpers')

let mmContract, mmFactory, owner, user1, user2, user3

describe('VideoMarketplace', () => {
  before(async function () {
    mmFactory = await ethers.getContractFactory('VideoMarketplace')
    ;[owner, user1, user2, user3] = await ethers.getSigners()
    // deploy contract with bridge address
    mmContract = await mmFactory.deploy()
    await mmContract.deployed()
  })
  it('returns all listed videos', async () => {
    const videos = await mmContract.getVideos()
    expect(videos.length).to.equal(0)
  })

  it('returns zero if user owns no videos', async () => {
    const res = await mmContract.getOwnedVideos()
    expect(res.length).to.equal(0)
  })

  it('allows user to list videos', async () => {
    let res = await mmContract.listVideo(
      'Title of my video',
      10,
      'http://arweave.com/123123'
    )
    let files = await mmContract.connect(user1).getVideos()

    expect(files.length).to.equal(1)

    res = await mmContract.listVideo(
      'Title Two',
      11,
      'http://arweave.com/12312334'
    )
    files = await mmContract.getVideos()
    expect(files.length).to.equal(2)
    expect(files[0].title).to.equal('Title of my video')
    expect(files[1].title).to.equal('Title Two')
    expect(files[0].price).to.equal(10)
    expect(files[1].price).to.equal(11)
    expect(files[0].buyers.length).to.equal(1)
    expect(files[1].buyers.length).to.equal(1)
    expect(files[0].buyers).to.include(owner.address)
    expect(files[0].author).to.equal(owner.address)

    expect(files[1].buyers).to.include(owner.address)
    expect(files[1].author).to.equal(owner.address)
  })

  it('fails if user tries to buy his own video', async () => {
    await expect(mmContract.buyVideo(0)).to.be.revertedWith(
      'You are the author of this video'
    )
  })

  it('fails if user tries to buy video doesnt exists', async () => {
    await expect(mmContract.connect(user1).buyVideo(10)).to.be.revertedWith(
      'The video does not exist'
    )
  })

  it('fails if user tries to buy paying less', async () => {
    await expect(
      mmContract.connect(user2).buyVideo(1, { value: 1 })
    ).to.be.revertedWith('Not enough funds')
  })
  it('allows user to buy video', async () => {
    await expect(mmContract.connect(user1).getBoughtVideos()).to.be.revertedWith(
      'You bought no videos'
    )
    let tx = await mmContract
      .connect(user1)
      .buyVideo(0, { value: ethers.utils.parseEther('10') })
    // console.log('tx', tx)
    const owned = await mmContract.connect(user1).getBoughtVideos()
    // console.log('owned', owned)
    expect(owned.length).to.equal(1)
    expect(owned[0].title).to.equal('Title of my video')
    expect(owned[0].price).to.equal(10)
    expect(owned[0].buyers.length).to.equal(2)
    expect(owned[0].buyers).to.include(user1.address)
    const link = await mmContract.connect(user1).getDownloadLink(0)
    console.log('link', link)
    expect(link).to.equal('http://arweave.com/123123')
  })
  it('fails if user tries to buy video that he already owns', async () => {
    await expect(mmContract.connect(user1).buyVideo(0)).to.be.revertedWith(
      'You already own this video'
    )
  })
  it('prevents non buyers to check download link', async () => {
    await expect(
      mmContract.connect(user3).getDownloadLink(0)
    ).to.be.revertedWith('You do not own this video.')
  })
  it('allows buyers to check download link of owned video', async () => {
    const link = await mmContract.connect(user1).getDownloadLink(0)
    expect(link).to.equal('http://arweave.com/123123')
  })
  it('allows users to retrieve all the videos they uploaded', async () => {
    const files = await mmContract.getOwnedVideos()
    expect(files.length).to.equal(2)
  })
  it('allows users to retrieve all the videos they bought', async () => {
    const files = await mmContract.connect(user1).getBoughtVideos()
    expect(files.length).to.equal(1)
  })
  it('allows author to retrieve video link when there is no buyers', async () => {
    const link = await mmContract.getDownloadLink(1)
    expect(link).to.equal('http://arweave.com/12312334')
  })
})
