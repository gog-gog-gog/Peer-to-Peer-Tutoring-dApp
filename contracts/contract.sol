// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Assume there's an ERC-20 token already deployed, and we're interacting with it
interface IToken {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract PeerToPeerTutoring {

    // Interface to the token contract
    IToken public token;

    // Struct to represent a tutoring offer
    struct TutoringOffer {
        address tutor;          // Tutor's address
        string topic;           // Tutoring topic
        uint256 tokensRequired; // Tokens required for one session
        bool isAvailable;       // Whether the tutor is still available
    }

    // Mapping to store tutoring offers by tutor address
    mapping(address => TutoringOffer) public tutoringOffers;

    // Event to log new tutoring offers
    event TutoringOffered(address indexed tutor, string topic, uint256 tokensRequired);

    // Event to log a tutoring session booking
    event TutoringSessionBooked(address indexed student, address indexed tutor, string topic, uint256 tokensPaid);

    // Constructor to set the token contract address
    constructor(address tokenAddress) {
        token = IToken(tokenAddress);
    }

    // Function 1: Offer tutoring services
    function offerTutoring(string calldata topic, uint256 tokensRequired) external {
        require(tokensRequired > 0, "Tokens required must be greater than 0");

        // Create a new tutoring offer
        tutoringOffers[msg.sender] = TutoringOffer({
            tutor: msg.sender,
            topic: topic,
            tokensRequired: tokensRequired,
            isAvailable: true
        });

        // Emit the TutoringOffered event
        emit TutoringOffered(msg.sender, topic, tokensRequired);
    }

    // Function 2: Book a tutoring session
    function bookTutoringSession(address tutor) external {
        TutoringOffer storage offer = tutoringOffers[tutor];
        require(offer.isAvailable, "This tutor is no longer available");
        require(offer.tokensRequired > 0, "This tutor has not set a valid token price");

        // Transfer tokens from the student to the tutor
        uint256 studentBalance = token.balanceOf(msg.sender);
        require(studentBalance >= offer.tokensRequired, "Insufficient tokens to book tutoring session");

        // Transfer tokens to the tutor
        token.transferFrom(msg.sender, tutor, offer.tokensRequired);

        // Mark the tutor as no longer available (if you want single-session bookings)
        offer.isAvailable = false;

        // Emit the TutoringSessionBooked event
        emit TutoringSessionBooked(msg.sender, tutor, offer.topic, offer.tokensRequired);
    }
}
