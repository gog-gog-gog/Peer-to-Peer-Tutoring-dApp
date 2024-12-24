# Peer-to-Peer Tutoring dApp

This is a decentralized application (dApp) that allows students to book tutoring sessions from tutors offering their services, using an ERC-20 token as the payment method. The dApp interacts with a smart contract on the Ethereum blockchain for offering tutoring services and booking sessions.

## Features

- **Offer Tutoring**: Tutors can list their services by specifying a topic and the number of tokens required for one session.
- **Book Tutoring**: Students can book a tutoring session by selecting an available tutor and paying the required tokens.
- **Token-based Payment**: The dApp uses an ERC-20 token for payment transactions between students and tutors.
- **Smart Contract Interaction**: The dApp interacts with a smart contract that handles tutoring offers and session bookings.

## Prerequisites

Before running the dApp, you need to have the following:

1. **MetaMask Extension**: Install MetaMask or another Ethereum wallet in your browser.
2. **Ethereum Network**: Connect MetaMask to an Ethereum network (e.g., Ropsten, Rinkeby, or Mainnet).
3. **Deployed Smart Contracts**: Deploy the `PeerToPeerTutoring` smart contract and the ERC-20 token contract. You will need the contract addresses for both.
4. **Web3.js**: The application uses Web3.js to interact with Ethereum and the deployed smart contracts.

## Getting Started

Follow these steps to get the project up and running locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/peer-to-peer-tutoring-dapp.git
cd peer-to-peer-tutoring-dapp
```

### 2. Install dependencies

Ensure you have a local development environment set up with Node.js. Then, install the required dependencies (such as `web3.js`):

```bash
npm init -y
npm install web3
```

### 3. Set up the smart contract

Deploy the `PeerToPeerTutoring` smart contract on an Ethereum network (Rinkeby, Ropsten, or Mainnet). Once deployed, make note of the following details:

- **Contract Address**: The address where the `PeerToPeerTutoring` smart contract is deployed.
- **ERC-20 Token Address**: The address of the deployed ERC-20 token that will be used for payments.

### 4. Update the `app.js` file

In the `app.js` file, update the contract addresses for both the `PeerToPeerTutoring` contract and the ERC-20 token:

```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with the deployed contract address
const tokenAddress = "YOUR_ERC20_TOKEN_ADDRESS"; // Replace with the ERC-20 token address
```

### 5. Open the dApp

Once you've updated the contract addresses, you can open the `index.html` file in your browser.

```bash
open index.html
```

Alternatively, you can set up a local server using tools like `http-server` or `Live Server` in your code editor.

### 6. Connect with MetaMask

When you open the dApp in your browser, it will prompt you to connect your MetaMask wallet. Make sure your MetaMask wallet is connected to the same Ethereum network where your contracts are deployed.

### 7. Interact with the dApp

- **Offer Tutoring**: Tutors can offer their services by specifying a topic and the number of tokens required for one session.
- **Book a Tutoring Session**: Students can view available tutors and book sessions by paying the required tokens via MetaMask.

## Features Walkthrough

1. **Offer Tutoring**:
   - Tutors can enter the tutoring topic and the number of tokens they want to charge for a session.
   - Clicking the "Offer Tutoring" button will add the tutoring offer to the blockchain and make the tutor available for students to book sessions.
2. **Available Tutors**:
   - A list of tutors with available services is displayed under the "Available Tutors" section. Students can click on any tutor to book a session.
3. **Book a Tutoring Session**:
   - Students can select a tutor from the list and book a session by paying the required number of tokens. The `transferFrom` function of the ERC-20 token is used to transfer tokens from the student's wallet to the tutor's wallet.

## Folder Structure

The project is structured as follows:

```
/peer-to-peer-tutoring-dapp
│
├── index.html      # HTML structure for the dApp
├── styles.css      # Styling for the frontend
└── app.js          # JavaScript for interacting with the smart contract
```

- `index.html`: Contains the structure of the dApp.
- `styles.css`: Provides the styles for the dApp's UI.
- `app.js`: Contains the logic for interacting with the Ethereum blockchain and the deployed smart contracts using Web3.js.

## Dependencies

- **Web3.js**: JavaScript library for interacting with Ethereum.
  - `https://cdn.jsdelivr.net/npm/web3@1.7.1/dist/web3.min.js`

## Smart Contract Interaction

This dApp interacts with the following functions in the smart contract:

1. **offerTutoring**:
   - Used by tutors to offer tutoring services by specifying the topic and the token amount required for one session.
2. **bookTutoringSession**:

   - Used by students to book a session with an available tutor, transferring the required tokens.

3. **getTutors** (custom function, not in the provided code):
   - This function would be used to get the list of available tutoring offers for students. It can be implemented in the smart contract if needed.

## Contributing

Feel free to fork this project and make improvements. To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Submit a pull request with a description of the changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes

- Ensure the Ethereum network you are using (Rinkeby, Ropsten, or Mainnet) is properly connected with your MetaMask.
- The smart contract and token contract should be deployed before running the dApp.
- The `bookTutoringSession` function assumes that the student has enough tokens to book a session. If the student doesn't have enough tokens, the booking will fail.

Feel free to modify and extend the dApp as per your use case!
