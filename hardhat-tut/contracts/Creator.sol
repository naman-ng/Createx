// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract VideoMarketplace {
    // Video struct
    struct Video {
        uint256 id;
        uint256 price;
        address author;
        address[] buyers;
        string title;
    }

    // array that stores all videos
    Video[] videos;

    // stores all videos URLs
    mapping(uint256 => string) private videoDownloadURLs;

    // events
    event VideoListed(uint256 indexed id, string title, uint256 price);
    event VideoSold(uint256 indexed id, address buyer);

    // MODIFIERS
    modifier isAuthor(uint256 _id) {
        require(
            msg.sender == videos[_id].author,
            "You are not the author of this video"
        );
        _;
    }

    modifier isNotAuthor(uint256 _id) {
        require(
            msg.sender != videos[_id].author,
            "You are the author of this video"
        );
        _;
    }

    modifier videoExists(uint256 _id) {
        require(videos.length >= _id, "The video does not exist");
        _;
    }

    // checks if msg.sender is included in buyers list of videos_id
    modifier isBuyer(uint256 _id) {
        require(videos[_id].buyers.length > 0, "The video has no buyers");

        bool userIsBuyer = false;
        for (uint256 x = 0; x < videos[_id].buyers.length; x++) {
            if (videos[_id].buyers[x] == msg.sender) {
                console.log("Found buyer: ", videos[_id].buyers[x]);
                userIsBuyer = true;
            }
        }
        require(userIsBuyer, "You do not own this video.");
        _;
    }

    // checks if msg.sender is included in buyers list of video _id
    modifier isNotBuyer(uint256 _id) {
        require(videos[_id].buyers.length > 0, "The video has no buyers");

        bool userIsNotBuyer = true;
        for (uint256 x = 0; x < videos[_id].buyers.length; x++) {
            if (videos[_id].buyers[x] == msg.sender) {
                console.log("Found buyer: ", videos[_id].buyers[x]);
                userIsNotBuyer = false;
            }
        }
        require(userIsNotBuyer, "You already own this video");
        _;
    }

    // FUNCTIONS
    function listVideo(
        string memory _title,
        uint256 _price,
        string memory _arweaveURI
    ) public {
        // save file info to files array
        Video memory video;

        video.id = videos.length;
        // save price and other info to video struct
        video.price = _price;
        video.author = msg.sender;
        video.title = _title;
        // create array to store buyers and
        // include the author
        address[] memory buyers = new address[](1);
        buyers[0] = msg.sender;
        // save buyers to video struct
        video.buyers = buyers;
        // save to list of videos
        videos.push(video);

        // save the file's arweave URI in private mapping
        console.log("Listing file with id", video.id);
        videoDownloadURLs[video.id] = _arweaveURI;

        emit VideoListed(video.id, _title, _price);
    }

    function buyVideo(uint256 _id)
        external
        payable
        videoExists(_id)
        isNotAuthor(_id)
        isNotBuyer(_id)
    {
        // check if user sent enough funds
        require(msg.value >= videos[_id].price, "Not enough funds");

        // transfer funds
        address payable receiver = payable(videos[_id].author);
        (bool sent, ) = receiver.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        // add sender to buyers array
        videos[_id].buyers.push(msg.sender);

        emit VideoSold(_id, msg.sender);
    }

    function getVideos() public view returns (Video[] memory) {
        return videos;
    }

    function getOwnedVideos() public view returns (Video[] memory) {
        uint256 resCount = 0;

        for (uint256 i = 0; i < videos.length; i++) {
            if (videos[i].author == msg.sender) {
                resCount++;
            }
        }
        Video[] memory ownedVideos = new Video[](resCount);
        for (uint256 x = 0; x < videos.length; x++) {
            if (videos[x].author == msg.sender) {
                ownedVideos[x] = videos[x];
            }
        }
        return ownedVideos;
    }

    function getDownloadLink(uint256 _id)
        public
        view
        videoExists(_id)
        isBuyer(_id)
        returns (string memory)
    {
        return videoDownloadURLs[_id];
    }

    function getBoughtVideos() public view returns (Video[] memory) {
        uint64 resCount = 0;

        for (uint256 i = 0; i < videos.length; i++) {
            if (videos[i].buyers.length > 0) {
                for (uint256 x = 0; x < videos[i].buyers.length; x++) {
                    if (videos[i].buyers[x] == msg.sender) {
                        resCount++;
                    }
                }
            }
        }

        require(resCount > 0, "You bought no videos");

        Video[] memory boughtVideos = new Video[](resCount);

        for (uint256 j = 0; j < videos.length; j++) {
            if (videos[j].buyers.length > 0) {
                for (uint256 v = 0; v < videos[j].buyers.length; v++) {
                    if (videos[j].buyers[v] == msg.sender) {
                        boughtVideos[j] = videos[j];
                    }
                }
            }
        }
        return boughtVideos;
    }
}
