// Define the contract address and ABI (you can get these after deploying the contract)
const contractAddress = "0x1b04afaAd19f3d6d27a1437C24E6aE5c5077366e";
const tokenAddress = "0x3F0d020AC634Cc4aec759e4FA1A9Ee604D262A4A"; // ERC-20 token address

// Create a Web3 instance and set it up with the current provider
let web3;
let contract;
let accounts;
let tokenContract;

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = await web3.eth.getAccounts();

        contract = new web3.eth.Contract([
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ], contractAddress);

        tokenContract = new web3.eth.Contract([
            {
                "constant": true,
                "inputs": [{ "name": "account", "type": "address" }],
                "name": "balanceOf",
                "outputs": [{ "name": "", "type": "uint256" }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [{ "name": "sender", "type": "address" }, { "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }],
                "name": "transferFrom",
                "outputs": [{ "name": "", "type": "bool" }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ], tokenAddress);

        // Load available tutors
        loadTutors();
    } else {
        alert("Please install MetaMask to use this dApp.");
    }
};

async function offerTutoring() {
    const topic = document.getElementById("topic").value;
    const tokensRequired = parseInt(document.getElementById("tokensRequired").value);

    if (!topic || tokensRequired <= 0) {
        alert("Please enter a valid topic and token amount.");
        return;
    }

    await contract.methods.offerTutoring(topic, tokensRequired).send({ from: accounts[0] });
    alert("Tutoring offered successfully!");
    loadTutors(); // Reload available tutors
}

async function loadTutors() {
    const tutorsList = document.getElementById("tutorsList");
    tutorsList.innerHTML = ""; // Clear the list before adding new tutors

    const tutors = await contract.methods.getTutors().call();

    tutors.forEach(tutor => {
        const li = document.createElement("li");
        li.textContent = `${tutor.topic} - ${tutor.tokensRequired} tokens`;
        li.addEventListener("click", () => {
            document.getElementById("tutorAddress").value = tutor.tutor;
        });
        tutorsList.appendChild(li);
    });
}

async function bookTutoringSession() {
    const tutorAddress = document.getElementById("tutorAddress").value;

    if (!tutorAddress) {
        alert("Please select a tutor.");
        return;
    }

    const offer = await contract.methods.tutoringOffers(tutorAddress).call();
    const studentBalance = await tokenContract.methods.balanceOf(accounts[0]).call();

    if (studentBalance < offer.tokensRequired) {
        alert("Insufficient tokens.");
        return;
    }

    await tokenContract.methods.transferFrom(accounts[0], tutorAddress, offer.tokensRequired).send({ from: accounts[0] });
    await contract.methods.bookTutoringSession(tutorAddress).send({ from: accounts[0] });

    alert("Tutoring session booked!");
}
